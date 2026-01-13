import React, { useState } from 'react';
import TransactionHistory from '../../components/payments/TransactionHistory';
import WalletBalance from '../../components/payments/WalletBalance';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { DepositModal } from '../../components/modals/DepositModal';
import { WithdrawModal } from '../../components/modals/WithdrawModal';
import { TransferModal } from '../../components/modals/TransferModal';
import { transactions as initialTransactions } from '../../data/transactions';
import { Transaction } from '../../types';

const PaymentsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  if (!user) {
    return null;
  }

  const handleDeposit = (amount: number) => {
    const newBalance = (user.walletBalance || 0) + amount;
    updateUser({ ...user, walletBalance: newBalance });

    const newTransaction: Transaction = {
      id: `txn${transactions.length + 1}`,
      amount,
      currency: 'USD',
      sender: 'Payment Gateway',
      receiver: user.name,
      status: 'completed',
      timestamp: new Date().toISOString(),
      type: 'DEPOSIT'
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleWithdraw = (amount: number) => {
    const newBalance = (user.walletBalance || 0) - amount;
    updateUser({ ...user, walletBalance: newBalance });

    const newTransaction: Transaction = {
      id: `txn${transactions.length + 1}`,
      amount,
      currency: 'USD',
      sender: user.name,
      receiver: 'Bank Account',
      status: 'completed',
      timestamp: new Date().toISOString(),
      type: 'WITHDRAWAL'
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleTransfer = (amount: number, recipientId: string) => {
    const newBalance = (user.walletBalance || 0) - amount;
    updateUser({ ...user, walletBalance: newBalance });

    const newTransaction: Transaction = {
      id: `txn${transactions.length + 1}`,
      amount,
      currency: 'USD',
      sender: user.name,
      receiver: recipientId,
      status: 'completed',
      timestamp: new Date().toISOString(),
      type: 'TRANSFER'
    };
    setTransactions([newTransaction, ...transactions]);
    // In a real app, you'd also update the recipient's balance and transaction history.
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Payments</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <WalletBalance user={user} />
          </div>
          <div className="md:col-span-2 flex items-center space-x-4">
            <Button onClick={() => setDepositModalOpen(true)}>Deposit</Button>
            <Button variant="outline" onClick={() => setWithdrawModalOpen(true)}>Withdraw</Button>
            <Button variant="outline" onClick={() => setTransferModalOpen(true)}>Transfer</Button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
          <TransactionHistory transactions={transactions} />
        </div>
      </div>

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setDepositModalOpen(false)}
        onDeposit={handleDeposit}
      />
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        onWithdraw={handleWithdraw}
      />
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        onTransfer={handleTransfer}
      />
    </div>
  );
};

export default PaymentsPage;


