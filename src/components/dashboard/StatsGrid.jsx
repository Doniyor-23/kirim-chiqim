'use client';

import { useFinance } from '../../context/FinanceContext';
import { useSettings } from '../../context/SettingsContext';
import StatCard from '../ui/StatCard';
import { getTodayTotal, getWeekTotal, getMonthTotal, getBalance } from '../../utils/calculateTotal';
import { formatCurrency } from '../../utils/currency';

export default function StatsGrid() {
  const { income, expenses } = useFinance();
  const { settings } = useSettings();

  const todayIncome = getTodayTotal(income);
  const todayExpense = getTodayTotal(expenses);
  const weekIncome = getWeekTotal(income);
  const monthIncome = getMonthTotal(income);
  const balance = getBalance(income, expenses);

  const icon = (path) => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard label="Today's Income" value={formatCurrency(todayIncome, settings.currency)} accent="emerald" icon={icon('M12 4v16m8-8H4')} trendLabel="Since midnight" />
      <StatCard label="Today's Expense" value={formatCurrency(todayExpense, settings.currency)} accent="rose" icon={icon('M20 12H4')} trendLabel="Since midnight" />
      <StatCard label="Weekly Income" value={formatCurrency(weekIncome, settings.currency)} accent="indigo" icon={icon('M8 7h12m0 0l-4-4m4 4l-4 4')} trendLabel="This week" />
      <StatCard label="Monthly Income" value={formatCurrency(monthIncome, settings.currency)} accent="amber" icon={icon('M3 3v18h18')} trendLabel="This month" />
      <StatCard
        label="Total Balance"
        value={formatCurrency(balance, settings.currency)}
        accent={balance >= 0 ? 'emerald' : 'rose'}
        icon={icon('M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2')}
        trendLabel="Income - Expense"
      />
    </div>
  );
}
