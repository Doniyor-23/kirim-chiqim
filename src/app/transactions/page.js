import TransactionsTable from '../../components/transactions/TransactionsTable';

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">All Transactions</h2>
        <p className="text-sm text-slate-500">Complete history of income and expenses</p>
      </div>
      <TransactionsTable />
    </div>
  );
}
