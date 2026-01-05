import React, { useState } from 'react';
import { users } from '../../data/users';
import { User, CallLog } from '../../types';
import { callLogs as initialCallLogs } from '../../data/callLogs';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { FiPhone } from 'react-icons/fi';

import CallLogList from '../../components/calls/CallLogList';
import ActiveCallView from '../../components/calls/ActiveCallView';
import PreCallModal from '../../components/modals/PreCallModal';
import './CallsPage.css';

const CallsPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState<CallLog[]>(initialCallLogs);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);

  const currentUserId = 'e1'; // Assuming 'e1' is the current logged-in user

  const handleStartCall = (type: 'audio' | 'video') => {
    if (selectedUser) {
      setCallType(type);
      setCallStartTime(new Date());
      setIsCallActive(true);
      setIsModalOpen(false);
    }
  };

  const handleEndCall = () => {
    if (selectedUser && callStartTime) {
      const callEndTime = new Date();
      const durationInSeconds = Math.round((callEndTime.getTime() - callStartTime.getTime()) / 1000);
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      const newLog: CallLog = {
        id: `cl${logs.length + 1}`,
        callerId: currentUserId,
        receiverId: selectedUser.id,
        type: callType,
        duration: formattedDuration,
        timestamp: new Date().toISOString(),
        status: 'outgoing', // Or 'answered' if you can determine that
      };
      setLogs([newLog, ...logs]);
    }
    setIsCallActive(false);
    setSelectedUser(null);
    setCallStartTime(null);
  };

  const openCallModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeCallModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 p-4 gap-4">
      {/* Left Content: Either Active Call or User List */}
      <div className="flex-1 w-[60%] bg-white p-6 rounded-lg shadow-md">
        {isCallActive && selectedUser ? (
          <ActiveCallView
            localUserId={currentUserId}
            remoteUserId={selectedUser.id}
            callType={callType}
            onEndCall={handleEndCall}
          />
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Start a Call</h1>
            <div className="space-y-4 h-[calc(100vh-8rem)] overflow-y-auto">
              {users
                .filter(user => user.id !== currentUserId)
                .map((user) => (
                <Card key={user.id} className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <Avatar src={user.avatarUrl} alt={user.name} className="w-12 h-12 mr-4" />
                    <div>
                      <h2 className="text-lg font-semibold">{user.name}</h2>
                      <p className="text-sm text-gray-600">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => openCallModal(user)}>
                      <FiPhone className="mr-2" />
                      Call
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar: Call Logs (Always visible) */}
      <div className={`
        ${isCallActive ? 'hidden md:block w-[40%]' : 'w-[40%]'}
        bg-white p-6 rounded-lg shadow-md transition-all duration-300
      `}>
        <h2 className="text-2xl font-bold mb-4">Call Logs</h2>
        <CallLogList currentUserId={currentUserId} logs={logs} />
      </div>

      <PreCallModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={closeCallModal}
        onStartCall={handleStartCall}
      />
    </div>
  );
};

export default CallsPage;
