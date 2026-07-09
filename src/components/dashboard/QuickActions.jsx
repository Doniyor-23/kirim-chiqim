'use client';

import Card from '../ui/Card';
import Button from '../ui/Button';

export default function QuickActions({ onAddIncome, onAddExpense }) {
  return (
    <Card className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-slate-300 mb-1">Quick Actions</h3>
      <Button onClick={onAddIncome} variant="primary" className="w-full justify-center">
        + Add Income
      </Button>
      <Button onClick={onAddExpense} variant="secondary" className="w-full justify-center">
        + Add Expense
      </Button>
    </Card>
  );
}
