export interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isEdited: boolean;
    isDeleted: boolean;
  }
  
 export  interface Participant {
    id: string;
    name: string;
    isActive: boolean;
  }

  export interface MobileSidebarProps {
    participants: Participant[];
    isOpen: boolean;
    onClose: () => void;
  }
  
  export interface ChatMessageProps {
    message: Message;
    isOwnMessage: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  }

  
  export interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
    isOpen: boolean;
    onClose: () => void;
  }
  
  export interface MessageInputProps {
    onSend: (message: string) => void;
    editingMessage: {
      id: string;
      content: string;
    } | null;
  }

  export const themeStyles = {
    light: {
      background: 'bg-gray-100',
      container: 'bg-white',
      header: 'bg-gray-100',
      text: 'text-gray-900',
      secondaryText: 'text-gray-500',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-50',
      messageBox: 'bg-white',
      input: 'bg-white border-gray-200',
    },
    dark: {
      background: 'bg-gray-900',
      container: 'bg-gray-800',
      header: 'bg-gray-800',
      text: 'text-white',
      secondaryText: 'text-gray-400',
      border: 'border-gray-700',
      hover: 'hover:bg-gray-700',
      messageBox: 'bg-gray-800',
      input: 'bg-gray-700 border-gray-600',
    },
    purple: {
      background: 'bg-purple-100',
      container: 'bg-white',
      header: 'bg-purple-600',
      text: 'text-gray-900',
      secondaryText: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:bg-purple-50',
      messageBox: 'bg-white',
      input: 'bg-white border-purple-200',
    }
  };
  
  export const layouts = {
    default: 'sided',
    compact: 'compact',
    wide: 'wide'
  };

  export interface ThemeContextType {
    theme: keyof typeof themeStyles;
    layout: keyof typeof layouts;
    styles: typeof themeStyles[keyof typeof themeStyles];
    setTheme: (theme: keyof typeof themeStyles) => void;
    setLayout: (layout: keyof typeof layouts) => void;
  }
  