import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, onDeposit }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    onDeposit(depositAmount);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deposit Funds">
      <div className="space-y-4">
        <p>Enter the amount you wish to deposit into your wallet.</p>
        <div>
          <Input
            type="number"
            placeholder="Enter deposit amount"
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
          <Button onClick={handleDeposit}>Deposit</Button>
        </div>
      </div>
    </Modal>
  );
};
