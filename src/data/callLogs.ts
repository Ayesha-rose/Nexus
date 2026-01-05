import { CallLog } from '../types';

export const callLogs: CallLog[] = [
  {
    id: 'cl1',
    callerId: 'e1',
    receiverId: 'i1',
    type: 'video',
    duration: '12:45',
    timestamp: '2026-01-04T10:30:00Z',
    status: 'answered',
  },
  {
    id: 'cl2',
    callerId: 'e2',
    receiverId: 'e1',
    type: 'audio',
    duration: '0:00',
    timestamp: '2026-01-03T18:15:00Z',
    status: 'missed',
  },
  {
    id: 'cl3',
    callerId: 'e1',
    receiverId: 'i2',
    type: 'video',
    duration: '25:10',
    timestamp: '2026-01-03T11:05:00Z',
    status: 'answered',
  },
  {
    id: 'cl4',
    callerId: 'e1',
    receiverId: 'e3',
    type: 'audio',
    duration: '3:21',
    timestamp: '2026-01-02T14:00:00Z',
    status: 'outgoing',
  },
  {
    id: 'cl5',
    callerId: 'i3',
    receiverId: 'e1',
    type: 'video',
    duration: '7:55',
    timestamp: '2026-01-02T09:45:00Z',
    status: 'answered',
  },
];
