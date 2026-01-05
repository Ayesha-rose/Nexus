import React from 'react';
import VideoCallModal from '../video/VideoCallModal';

interface ActiveCallViewProps {
  localUserId: string;
  remoteUserId: string;
  callType: 'audio' | 'video';
  onEndCall: () => void;
}

const ActiveCallView: React.FC<ActiveCallViewProps> = ({ localUserId, remoteUserId, callType, onEndCall }) => {
  return (
    <VideoCallModal
      localUserId={localUserId}
      remoteUserId={remoteUserId}
      callType={callType}
      onEndCall={onEndCall}
    />
  );
};

export default ActiveCallView;
