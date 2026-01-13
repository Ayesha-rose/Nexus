import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/AuthContext';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (amount: number, recipientId: string) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, onTransfer }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!recipientId) {
      setError('Please enter a recipient.');
      return;
    }
    if (user && user.walletBalance < transferAmount) {
      setError('Insufficient funds.');
      return;
    }
    onTransfer(transferAmount, recipientId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Funds">
      <div className="space-y-4">
        <p>Enter the amount and recipient for the transfer.</p>
        <p className="text-sm text-gray-500">Your available balance is {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user?.walletBalance || 0)}</p>
        <div>
          <Input
            type="number"
            placeholder="Enter transfer amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            startAdornment="$"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Recipient User ID"
            value={recipientId}
            onChange={(e) => {
              setRecipientId(e.target.value);
              setError('');
            }}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleTransfer}>Transfer</Button>
        </div>
      </div>
    </Modal>
  );
};
