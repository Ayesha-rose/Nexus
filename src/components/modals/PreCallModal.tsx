import React from 'react';
import { User } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { FiPhone, FiVideo } from 'react-icons/fi';

interface PreCallModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onStartCall: (type: 'audio' | 'video') => void;
}

const PreCallModal: React.FC<PreCallModalProps> = ({ user, isOpen, onClose, onStartCall }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Call ${user.name}`}>
      <div className="flex flex-col items-center p-6">
        <Avatar src={user.avatarUrl} alt={user.name} className="w-28 h-28 mb-4" />
        <p className="text-xl font-semibold text-white mb-2">{user.name}</p>
        <p className="text-gray-400 mb-6">Choose call type</p>
        <div className="flex w-full space-x-4">
          <Button
            className="w-full flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => onStartCall('audio')}
          >
            <FiPhone className="mr-2" />
            Audio Call
          </Button>
          <Button
            className="w-full flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => onStartCall('video')}
          >
            <FiVideo className="mr-2" />
            Video Call
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PreCallModal;
