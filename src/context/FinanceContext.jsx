'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialIncome, initialExpenses } from '../data/dummyData';

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [income, setIncome] = useLocalStorage('rf_income', initialIncome);
  const [expenses, setExpenses] = useLocalStorage('rf_expenses', initialExpenses);

  const addIncome = (entry) => {
    setIncome((prev) => [{ ...entry, id: `inc-${Date.now()}` }, ...prev]);
  };
  const updateIncome = (id, updates) => {
    setIncome((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };
  const deleteIncome = (id) => {
    setIncome((prev) => prev.filter((item) => item.id !== id));
  };

  const addExpense = (entry) => {
    setExpenses((prev) => [{ ...entry, id: `exp-${Date.now()}` }, ...prev]);
  };
  const updateExpense = (id, updates) => {
    setExpenses((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const resetAllData = () => {
    setIncome(initialIncome);
    setExpenses(initialExpenses);
  };

  const importData = (data) => {
    if (data.income) setIncome(data.income);
    if (data.expenses) setExpenses(data.expenses);
  };

  return (
    <FinanceContext.Provider
      value={{
        income,
        expenses,
        addIncome,
        updateIncome,
        deleteIncome,
        addExpense,
        updateExpense,
        deleteExpense,
        resetAllData,
        importData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within FinanceProvider');
  return context;
}
