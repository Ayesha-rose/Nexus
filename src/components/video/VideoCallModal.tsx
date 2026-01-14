
import React, { useState, useRef, useEffect } from 'react';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiShare, FiPhone, FiMonitor } from 'react-icons/fi';
import { findUserById } from '../../data/users';

interface VideoCallModalProps {
  localUserId: string;
  remoteUserId: string;
  callType: 'audio' | 'video';
  onEndCall: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ localUserId, remoteUserId, callType, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'audio');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const localUser = findUserById(localUserId);
  const remoteUser = findUserById(remoteUserId);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prevDuration => prevDuration + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let localStream: MediaStream | null = null;

    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video' && !isVideoOff,
          audio: true,
        });
        localStream = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    if (!isScreenSharing) {
      setupMedia();
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [callType, isVideoOff, isScreenSharing]);

  const handleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop screen sharing
      const stream = screenShareRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      screenShareRef.current!.srcObject = null;
      setIsScreenSharing(false);
    } else {
      // Start screen sharing
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = stream;
        }
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          if (screenShareRef.current) {
            screenShareRef.current.srcObject = null;
          }
        };
        setIsScreenSharing(true);
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    }
  };

  if (!localUser || !remoteUser) {
    return <div className="text-white">User not found.</div>;
  }

  return (
    <div className="w-full h-full bg-black flex flex-col relative">
      {/* Call Timer */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-lg">
        {new Date(callDuration * 1000).toISOString().substr(14, 5)}
      </div>

      {/* Main View */}
      <div className="flex-1 flex items-center justify-center">
        {isScreenSharing ? (
          <video ref={screenShareRef} autoPlay playsInline className="w-full h-full" />
        ) : isVideoOff ? (
          <div className="flex flex-col items-center">
            <img src={remoteUser.avatarUrl} alt={remoteUser.name} className="w-48 h-48 rounded-full" />
            <h2 className="text-3xl text-white mt-4">{remoteUser.name}</h2>
            <p className="text-gray-400">On an audio call</p>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
             <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full" />
            <p className="absolute">{remoteUser.name}'s Video</p>
          </div>
        )}
      </div>

      {/* Local User Video (Picture-in-Picture) */}
      <div className="absolute bottom-28 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
        <div className="w-full h-full flex items-center justify-center text-white text-sm">
          {callType === 'video' && !isVideoOff ? (
             <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          ) : (
            <img src={localUser.avatarUrl} alt={localUser.name} className="w-20 h-20 rounded-full" />
          )}
        </div>
      </div>

      {/* Call Controls */}
      <div className="bg-gray-900 bg-opacity-75 p-4 flex justify-center items-center space-x-6">
        <button onClick={() => setIsMuted(!isMuted)} className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors">
          {isMuted ? <FiMicOff size={24} /> : <FiMic size={24} />}
        </button>
        {callType === 'video' && (
          <button onClick={() => setIsVideoOff(!isVideoOff)} className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors">
            {isVideoOff ? <FiVideoOff size={24} /> : <FiVideo size={24} />}
          </button>
        )}
        <button onClick={handleScreenShare} className={`p-4 rounded-full text-white transition-colors ${isScreenSharing ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
          {isScreenSharing ? <FiMonitor size={24} /> : <FiShare size={24} />}
        </button>
        <button onClick={onEndCall} className="p-4 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors">
          <FiPhone size={24} style={{ transform: 'rotate(135deg)' }} />
        </button>
      </div>
    </div>
  );
};

export default VideoCallModal;
