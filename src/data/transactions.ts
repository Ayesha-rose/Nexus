import { Transaction } from '../types';

export const transactions: Transaction[] = [
  {
    id: 'txn1',
    amount: 50000,
    currency: 'USD',
    sender: 'Michael Rodriguez',
    receiver: 'Sarah Johnson',
    status: 'completed',
    timestamp: '2024-07-28T10:00:00Z',
  },
  {
    id: 'txn2',
    amount: 100000,
    currency: 'USD',
    sender: 'Jennifer Lee',
    receiver: 'David Chen',
    status: 'completed',
    timestamp: '2024-07-27T11:30:00Z',
  },
  {
    id: 'txn3',
    amount: 25000,
    currency: 'USD',
    sender: 'Robert Torres',
    receiver: 'Maya Patel',
    status: 'pending',
    timestamp: '2024-07-26T14:00:00Z',
  },
  {
    id: 'txn4',
    amount: 75000,
    currency: 'USD',
    sender: 'Michael Rodriguez',
    receiver: 'James Wilson',
    status: 'completed',
    timestamp: '2024-07-25T16:45:00Z',
  },
  {
    id: 'txn5',
    amount: 150000,
    currency: 'USD',
    sender: 'Jennifer Lee',
    receiver: 'Sarah Johnson',
    status: 'failed',
    timestamp: '2024-07-24T09:15:00Z',
  },
];
