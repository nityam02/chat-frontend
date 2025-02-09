import { useState, useRef, useEffect } from 'react';

import ParticipantsList from './components/ParticipantsList';
import MessageInput from './components/MessageInput';
import ChatMessage from './components/ChatMessage';
import { ThemeProvider, useTheme } from './contexts/theme-context';
import ThemeSelector from './components/ThemeSelector';
import MobileSidebar from './MobileSidebar';
import { Users } from 'lucide-react';
import { Message,Participant } from './types'

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const { styles, layout } = useTheme();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8080');

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);

      switch (data.type) {
        case 'message':
          setMessages((prev) => [
            ...prev,
            {
              ...data,
              isEdited: false,
              isDeleted: false,
            },
          ]);
          break;

        case 'edit_message':
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === data.messageId
                ? {
                    ...msg,
                    content: data.content,
                    isEdited: true,
                  }
                : msg
            )
          );
          break;

        case 'delete_message':
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === data.messageId
                ? {
                    ...msg,
                    content: 'This message was deleted',
                    isDeleted: true,
                  }
                : msg
            )
          );
          break;

        case 'participants':
          setParticipants(
            data.participants.map((p: Participant) => ({
              ...p,
              isActive: true,
            }))
          );
          break;

        case 'participant_joined':
          setParticipants((prev) => [
            ...prev,
            {
              ...data.participant,
              isActive: true,
            },
          ]);
          break;

        case 'participant_left':
          setParticipants((prev) =>
            prev.filter((p) => p.id !== data.participantId)
          );
          break;
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = (content: string) => {
    if (!wsRef.current) return;

    const messageData = {
      type: editingMessage ? 'edit_message' : 'message',
      id: editingMessage ? editingMessage.id : Date.now().toString(),
      messageId: editingMessage ? editingMessage.id : undefined,
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    wsRef.current.send(JSON.stringify(messageData));

    if (editingMessage) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingMessage.id
            ? {
                ...msg,
                content,
                isEdited: true,
              }
            : msg
        )
      );
      setEditingMessage(null);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          ...messageData,
          sender: 'You',
          isEdited: false,
          isDeleted: false,
        },
      ]);
    }
  };

  const handleEditMessage = (id: string) => {
    const message = messages.find((m) => m.id === id);
    if (message) {
      setEditingMessage(message);
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (!wsRef.current) return;

    wsRef.current.send(
      JSON.stringify({
        type: 'delete_message',
        messageId: id,
      })
    );

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              content: 'This message was deleted',
              isDeleted: true,
            }
          : msg
      )
    );
  };

  return (
    <div className={`min-h-screen ${styles.background}`}>
      <div
        className={`${
          layout === 'wide' ? 'max-w-7xl' : 'max-w-6xl'
        } mx-auto h-screen md:p-4`}
      >
        <div
          className={`${styles.container} rounded-none md:rounded-lg shadow-lg h-full flex flex-col`}
        >
          <div
            className={`${styles.header} px-4 md:px-6 py-4 border-b ${styles.border} flex justify-between items-center`}
          >
            <h1 className={`text-xl font-semibold ${styles.text}`}>
              Status Meeting Standup
            </h1>
            <div className="flex items-center gap-2">
              {isMobile && (
                <button
                  onClick={() => setShowMobileSidebar(true)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <Users size={20} />
                </button>
              )}
              <ThemeSelector />
            </div>
          </div>

          <div className="flex flex-1 min-h-0">
            {!isMobile && layout !== 'compact' && (
              <div className="hidden md:block w-64 border-r border-gray-200">
                <div className="p-4">
                  <ParticipantsList participants={participants} />
                </div>
              </div>
            )}
            <MobileSidebar
              participants={participants}
              isOpen={showMobileSidebar}
              onClose={() => setShowMobileSidebar(false)}
            />
            <div className="flex-1 flex flex-col min-h-0">
              <div
                className={`flex-1 overflow-y-auto p-4 md:p-6 ${
                  layout === 'compact' ? 'md:p-2' : ''
                }`}
              >
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isOwnMessage={message.sender === 'You'}
                    onEdit={handleEditMessage}
                    onDelete={handleDeleteMessage}
                  />
                ))}
              </div>
              <MessageInput
                onSend={handleSendMessage}
                editingMessage={editingMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ChatContent />
    </ThemeProvider>
  );
};

export default App;