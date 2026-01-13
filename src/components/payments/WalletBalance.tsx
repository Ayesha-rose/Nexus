import React from 'react';
import { Card } from '../ui/Card';
import { User } from '../../types';

interface WalletBalanceProps {
  user: User;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ user }) => {
  return (
    <Card className="shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Wallet Balance</h3>
        <p className="text-3xl font-bold text-gray-900">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.walletBalance)}
        </p>
        <p className="text-sm text-gray-500 mt-1">Available Funds</p>
      </div>
    </Card>
  );
};

export default WalletBalance;
