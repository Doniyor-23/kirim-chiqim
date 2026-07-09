'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const defaultSettings = {
  restaurantName: 'The Golden Spoon',
  currency: 'USD',
  taxPercentage: 8,
  theme: 'dark',
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('rf_settings', defaultSettings);

  const updateSettings = (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetSettings = () => setSettings(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
