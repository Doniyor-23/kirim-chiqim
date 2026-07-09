import ExpenseTable from '../../components/expense/ExpenseTable';

export default function ExpensePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Expense Management</h2>
        <p className="text-sm text-slate-500">Track and manage all business expenses</p>
      </div>
      <ExpenseTable />
    </div>
  );
}
