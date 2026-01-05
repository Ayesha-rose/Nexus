import React from 'react';
import { CallLog } from '../../types';
import { findUserById } from '../../data/users';
import { FiPhoneIncoming, FiPhoneMissed, FiVideo, FiPhone } from 'react-icons/fi';
import { format } from 'date-fns';

interface CallLogListProps {
  currentUserId: string;
  logs: CallLog[];
}

const CallLogItem: React.FC<{ log: CallLog; currentUserId: string }> = ({ log, currentUserId }) => {
  const otherUserId = log.callerId === currentUserId ? log.receiverId : log.callerId;
  const otherUser = findUserById(otherUserId);
  const isOutgoing = log.callerId === currentUserId;
  const isMissed = log.status === 'missed';

  const getStatusIcon = () => {
    if (isMissed) {
      return <FiPhoneMissed className="text-red-500" />;
    }
    if (isOutgoing) {
      // This icon could be different, but for now, we use a generic one.
      return <FiPhone className="text-gray-400" />;
    }
    return <FiPhoneIncoming className="text-green-500" />;
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
      <div className="flex items-center">
        <img src={otherUser?.avatarUrl} alt={otherUser?.name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-gray-800">{otherUser?.name}</p>
          <div className="flex items-center text-sm text-gray-400">
            {getStatusIcon()}
            <span className="ml-2">{format(new Date(log.timestamp), 'p')}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-400">{log.duration}</span>
        {log.type === 'video' ? <FiVideo className="text-gray-400" /> : <FiPhone className="text-gray-400" />}
      </div>
    </div>
  );
};

const CallLogList: React.FC<CallLogListProps> = ({ currentUserId, logs }) => {
  const sortedLogs = [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {sortedLogs.map(log => (
          <CallLogItem key={log.id} log={log} currentUserId={currentUserId} />
        ))}
      </div>
    </div>
  );
};

export default CallLogList;
