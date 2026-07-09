'use client';

import { useModal } from '../../hooks/useModal';
import { useFinance } from '../../context/FinanceContext';
import StatsGrid from '../../components/dashboard/StatsGrid';
import IncomeChart from '../../components/dashboard/IncomeChart';
import ExpenseChart from '../../components/dashboard/ExpenseChart';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import QuickActions from '../../components/dashboard/QuickActions';
import IncomeForm from '../../components/income/IncomeForm';
import ExpenseForm from '../../components/expense/ExpenseForm';

export default function DashboardPage() {
  const { addIncome, addExpense } = useFinance();
  const incomeModal = useModal();
  const expenseModal = useModal();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Dashboard</h2>
        <p className="text-sm text-slate-500">Overview of your restaurant's cash flow</p>
      </div>

      <StatsGrid />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <IncomeChart />
          <ExpenseChart />
        </div>
        <div className="space-y-6">
          <QuickActions onAddIncome={() => incomeModal.open()} onAddExpense={() => expenseModal.open()} />
          <RecentTransactions />
        </div>
      </div>

      <IncomeForm isOpen={incomeModal.isOpen} onClose={incomeModal.close} onSubmit={addIncome} initialData={null} />
      <ExpenseForm isOpen={expenseModal.isOpen} onClose={expenseModal.close} onSubmit={addExpense} initialData={null} />
    </div>
  );
}
