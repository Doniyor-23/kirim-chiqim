'use client';

import { useState } from 'react';
import DailyReport from '../../components/reports/DailyReport';
import WeeklyReport from '../../components/reports/WeeklyReport';
import MonthlyReport from '../../components/reports/MonthlyReport';

const TABS = ['Daily', 'Weekly', 'Monthly'];

export default function ReportsPage() {
  const [tab, setTab] = useState('Daily');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Financial Reports</h2>
        <p className="text-sm text-slate-500">Analyze profit, loss and category breakdowns</p>
      </div>

      <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Daily' && <DailyReport />}
      {tab === 'Weekly' && <WeeklyReport />}
      {tab === 'Monthly' && <MonthlyReport />}
    </div>
  );
}
