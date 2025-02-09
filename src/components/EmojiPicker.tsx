import { useRef, useEffect } from 'react';
import {EmojiPickerProps} from '../types'

const EmojiPicker = ({ onSelect, isOpen, onClose }: EmojiPickerProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const emojiCategories: Record<string, string[]> = {
    'Smileys': ['😊', '😂', '🤣', '😅', '😆', '😍', '🥰', '😎'],
    'Gestures': ['👍', '👋', '👏', '🙌', '🤝', '✌️', '🤞', '👊'],
    'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍'],
    'Common': ['✨', '🎉', '🔥', '💯', '⭐', '💪', '🎵', '💡']
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={pickerRef}
      className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-4 w-72 z-50"
    >
      {Object.entries(emojiCategories).map(([category, emojis]) => (
        <div key={category} className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">{category}</h3>
          <div className="grid grid-cols-8 gap-1">
            {emojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => onSelect(emoji)}
                className="p-1.5 text-xl hover:bg-gray-100 rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmojiPicker;