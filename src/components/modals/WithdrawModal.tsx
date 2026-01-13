import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/AuthContext';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (amount: number) => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, onWithdraw }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (user && user.walletBalance < withdrawAmount) {
      setError('Insufficient funds.');
      return;
    }
    onWithdraw(withdrawAmount);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Funds">
      <div className="space-y-4">
        <p>Enter the amount you wish to withdraw from your wallet.</p>
        <p className="text-sm text-gray-500">Your available balance is {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user?.walletBalance || 0)}</p>
        <div>
          <Input
            type="number"
            placeholder="Enter withdrawal amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            startAdornment="$"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleWithdraw}>Withdraw</Button>
        </div>
      </div>
    </Modal>
  );
};
