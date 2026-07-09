'use client';

import { useSettings } from '../../context/SettingsContext';

export default function Header({ onMenuClick }) {
  const { settings } = useSettings();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-slate-100">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="font-semibold text-slate-100">{settings.restaurantName}</h1>
          <p className="text-xs text-slate-500">{today}</p>
        </div>
      </div>
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
        {settings.restaurantName.charAt(0)}
      </div>
    </header>
  );
}
