'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { groupByCategory } from '../../utils/calculateTotal';
import Card from '../ui/Card';

const COLORS = ['#6366f1', '#f43f5e', '#f59e0b', '#10b981', '#0ea5e9', '#a855f7'];

export default function ExpenseChart() {
  const { expenses } = useFinance();
  const data = groupByCategory(expenses);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Expenses by Category</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="category" innerRadius={50} outerRadius={80} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
