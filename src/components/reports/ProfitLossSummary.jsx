import Card from '../ui/Card';
import { formatCurrency } from '../../utils/currency';

export default function ProfitLossSummary({ totalIncome, totalExpense, currency }) {
  const profit = totalIncome - totalExpense;
  const isProfit = profit >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <p className="text-sm text-slate-400 mb-2">Total Income</p>
        <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalIncome, currency)}</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-400 mb-2">Total Expense</p>
        <p className="text-2xl font-bold text-rose-400">{formatCurrency(totalExpense, currency)}</p>
      </Card>
      <Card className={isProfit ? 'ring-1 ring-emerald-500/30' : 'ring-1 ring-rose-500/30'}>
        <p className="text-sm text-slate-400 mb-2">{isProfit ? 'Total Profit' : 'Total Loss'}</p>
        <p className={`text-2xl font-bold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>{formatCurrency(Math.abs(profit), currency)}</p>
      </Card>
    </div>
  );
}
