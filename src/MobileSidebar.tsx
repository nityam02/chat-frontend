import { X } from 'lucide-react';
import {MobileSidebarProps} from './types'

const MobileSidebar = ({ participants, isOpen, onClose }: MobileSidebarProps) => (
  <div
    className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <div
      className={`absolute right-0 top-0 h-full w-64 bg-white transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold">Participants ({participants.length})</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X size={20} />
        </button>
      </div>
      <div className="p-4">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="p-2 hover:bg-gray-100 rounded flex items-center gap-2"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                participant.isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
            <span>{participant.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MobileSidebar;