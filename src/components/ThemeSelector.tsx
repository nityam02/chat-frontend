import { useState, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';
import { useTheme } from '../contexts/theme-context';

const ThemeSelector = () => {
  const { theme, layout, setTheme, setLayout } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border z-50">
          <div className="px-4 py-2">
            <h3 className="font-semibold mb-2">Theme</h3>
            <div className="space-y-2">
              {['light', 'dark', 'purple'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t as "light")}
                  className={`w-full text-left px-2 py-1 rounded ${
                    theme === t ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="border-t my-2"></div>
          
          <div className="px-4 py-2">
            <h3 className="font-semibold mb-2">Layout</h3>
            <div className="space-y-2">
              {['default', 'compact', 'wide'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLayout(l as "default")}
                  className={`w-full text-left px-2 py-1 rounded ${
                    layout === l ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;