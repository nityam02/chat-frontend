import { Edit2, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/theme-context';
import {ChatMessageProps} from '../types'


const ChatMessage = ({ message, isOwnMessage, onEdit, onDelete }: ChatMessageProps) => {
  const { styles, layout } = useTheme();

  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 
        ${layout === 'compact' ? 'mx-2' : 'mx-4'}`}
    >
      <div className={`${layout === 'compact' ? 'max-w-[85%]' : 'max-w-[70%]'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-medium ${styles.text}`}>{message.sender}</span>
          <span className={`text-sm ${styles.secondaryText}`}>{message.timestamp}</span>
          {message.isEdited && (
            <span className={`text-xs ${styles.secondaryText}`}>(edited)</span>
          )}
        </div>
        <div className={`relative group ${styles.messageBox} rounded-lg p-3 shadow-sm ${styles.hover}`}>
          <div className="pr-16">
            <p className={`${message.isDeleted ? 'italic ' + styles.secondaryText : styles.text}`}>
              {message.content}
            </p>
          </div>
          {isOwnMessage && !message.isDeleted && (
            <div className="absolute top-2 right-2">
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(message.id)}
                  className={`p-1.5 rounded ${styles.hover} ${styles.secondaryText} hover:text-blue-600`}
                  title="Edit message"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(message.id)}
                  className={`p-1.5 rounded ${styles.hover} ${styles.secondaryText} hover:text-red-600`}
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;