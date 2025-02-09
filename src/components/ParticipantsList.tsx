import {Participant} from '../types'

const ParticipantsList = ({
    participants
  }: {
    participants: Participant[];
  }) => (
    <div className="w-64 border-r border-gray-200">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Participants ({participants.length})</h2>
        <div className="space-y-2">
          {participants.map(participant => (
            <div
              key={participant.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <div className={`w-2 h-2 rounded-full ${
                participant.isActive ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span>{participant.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  export default ParticipantsList