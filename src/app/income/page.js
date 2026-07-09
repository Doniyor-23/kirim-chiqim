import IncomeTable from '../../components/income/IncomeTable';

export default function IncomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Income Management</h2>
        <p className="text-sm text-slate-500">Track and manage all revenue sources</p>
      </div>
      <IncomeTable />
    </div>
  );
}
