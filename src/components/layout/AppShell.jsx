'use client';

import { useState } from 'react';
import { FinanceProvider } from '../../context/FinanceContext';
import { SettingsProvider } from '../../context/SettingsContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SettingsProvider>
      <FinanceProvider>
        <div className="min-h-screen bg-slate-950">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex flex-col min-w-0 lg:ml-64">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 animate-fadeIn">{children}</main>
          </div>
        </div>
      </FinanceProvider>
    </SettingsProvider>
  );
}