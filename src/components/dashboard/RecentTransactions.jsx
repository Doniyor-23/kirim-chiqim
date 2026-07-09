'use client';

import { useFinance } from '../../context/FinanceContext';
import { useSettings } from '../../context/SettingsContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';

export default function RecentTransactions() {
  const { income, expenses } = useFinance();
  const { settings } = useSettings();

  const combined = [...income.map((i) => ({ ...i, type: 'income' })), ...expenses.map((e) => ({ ...e, type: 'expense' }))]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {combined.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}
              >
                {tx.type === 'income' ? '↑' : '↓'}
              </div>
              <div>
                <p className="text-sm text-slate-200 font-medium">{tx.note || tx.category}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge color={tx.type === 'income' ? 'emerald' : 'rose'}>{tx.category}</Badge>
                  <span className="text-xs text-slate-500">{formatDate(tx.date)}</span>
                </div>
              </div>
            </div>
            <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {tx.type === 'income' ? '+' : '-'}
              {formatCurrency(tx.amount, settings.currency)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
