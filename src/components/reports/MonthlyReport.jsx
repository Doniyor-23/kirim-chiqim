'use client';

import { useFinance } from '../../context/FinanceContext';
import { useSettings } from '../../context/SettingsContext';
import { isThisMonth } from '../../utils/date';
import { sumAmounts, groupByCategory } from '../../utils/calculateTotal';
import ProfitLossSummary from './ProfitLossSummary';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/currency';

export default function MonthlyReport() {
  const { income, expenses } = useFinance();
  const { settings } = useSettings();

  const monthIncome = income.filter((i) => isThisMonth(i.date));
  const monthExpenses = expenses.filter((e) => isThisMonth(e.date));

  return (
    <div className="space-y-6">
      <ProfitLossSummary totalIncome={sumAmounts(monthIncome)} totalExpense={sumAmounts(monthExpenses)} currency={settings.currency} />
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Income by Category (This Month)</h3>
          <div className="space-y-3">
            {groupByCategory(monthIncome).length === 0 && <p className="text-sm text-slate-500">No income this month.</p>}
            {groupByCategory(monthIncome).map((c) => (
              <div key={c.category} className="flex items-center justify-between">
                <Badge color="emerald">{c.category}</Badge>
                <span className="text-emerald-400 font-medium">{formatCurrency(c.total, settings.currency)}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Expenses by Category (This Month)</h3>
          <div className="space-y-3">
            {groupByCategory(monthExpenses).length === 0 && <p className="text-sm text-slate-500">No expenses this month.</p>}
            {groupByCategory(monthExpenses).map((c) => (
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
