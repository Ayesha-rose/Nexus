import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/AuthContext';

interface FundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: any; // Replace 'any' with a proper Deal type
  onFund: (amount: number) => void;
}

export const FundingModal: React.FC<FundingModalProps> = ({ isOpen, onClose, deal, onFund }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleFund = () => {
    const fundingAmount = parseFloat(amount);
    if (isNaN(fundingAmount) || fundingAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (user && user.walletBalance < fundingAmount) {
      setError('Insufficient funds.');
      return;
    }
    onFund(fundingAmount);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Fund ${deal?.startup.name}`}>
      <div className="space-y-4">
        <p>You are about to fund <span className="font-semibold">{deal?.startup.name}</span>.</p>
        <p className="text-sm text-gray-500">Your available balance is {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user?.walletBalance || 0)}</p>
        <div>
          <Input
            type="number"
            placeholder="Enter amount to fund"
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
          <Button onClick={handleFund}>Fund Deal</Button>
        </div>
      </div>
    </Modal>
  );
};
