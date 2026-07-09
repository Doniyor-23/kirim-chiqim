'use client';

import { useFinance } from '../../context/FinanceContext';
import { useSettings } from '../../context/SettingsContext';
import { isToday } from '../../utils/date';
import { sumAmounts, groupByCategory } from '../../utils/calculateTotal';
import ProfitLossSummary from './ProfitLossSummary';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/currency';

export default function DailyReport() {
  const { income, expenses } = useFinance();
  const { settings } = useSettings();

  const todayIncome = income.filter((i) => isToday(i.date));
  const todayExpenses = expenses.filter((e) => isToday(e.date));

  return (
    <div className="space-y-6">
      <ProfitLossSummary totalIncome={sumAmounts(todayIncome)} totalExpense={sumAmounts(todayExpenses)} currency={settings.currency} />
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Income by Category (Today)</h3>
          <div className="space-y-3">
            {groupByCategory(todayIncome).length === 0 && <p className="text-sm text-slate-500">No income recorded today.</p>}
            {groupByCategory(todayIncome).map((c) => (
              <div key={c.category} className="flex items-center justify-between">
                <Badge color="emerald">{c.category}</Badge>
                <span className="text-emerald-400 font-medium">{formatCurrency(c.total, settings.currency)}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Expenses by Category (Today)</h3>
          <div className="space-y-3">
            {groupByCategory(todayExpenses).length === 0 && <p className="text-sm text-slate-500">No expenses recorded today.</p>}
            {groupByCategory(todayExpenses).map((c) => (
              <div key={c.category} className="flex items-center justify-between">
                <Badge color="rose">{c.category}</Badge>
                <span className="text-rose-400 font-medium">{formatCurrency(c.total, settings.currency)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
