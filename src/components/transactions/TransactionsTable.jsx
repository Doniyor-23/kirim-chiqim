'use client';

import { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useSettings } from '../../context/SettingsContext';
import { useDebounce } from '../../hooks/useDebounce';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import SearchInput from '../ui/SearchInput';
import EmptyState from '../ui/EmptyState';
import Select from '../ui/Select';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';

const SORT_OPTIONS = ['Newest First', 'Oldest First', 'Highest Amount', 'Lowest Amount'];
const TYPE_OPTIONS = ['All Types', 'Income', 'Expense'];

export default function TransactionsTable() {
  const { income, expenses } = useFinance();
  const { settings } = useSettings();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [type, setType] = useState('All Types');
  const [sort, setSort] = useState('Newest First');

  const combined = useMemo(() => {
    let items = [...income.map((i) => ({ ...i, type: 'Income' })), ...expenses.map((e) => ({ ...e, type: 'Expense' }))];

    if (type !== 'All Types') items = items.filter((i) => i.type === type);

    items = items.filter(
      (i) => (i.note || '').toLowerCase().includes(debouncedSearch.toLowerCase()) || i.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    switch (sort) {
      case 'Oldest First':
        items.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'Highest Amount':
        items.sort((a, b) => b.amount - a.amount);
        break;
      case 'Lowest Amount':
        items.sort((a, b) => a.amount - b.amount);
        break;
      default:
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return items;
  }, [income, expenses, type, sort, debouncedSearch]);

  const columns = [
    { key: 'date', label: 'Date', render: (row) => formatDate(row.date) },
    { key: 'type', label: 'Type', render: (row) => <Badge color={row.type === 'Income' ? 'emerald' : 'rose'}>{row.type}</Badge> },
    { key: 'category', label: 'Category' },
    { key: 'note', label: 'Note', render: (row) => row.note || '—' },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => (
        <span className={row.type === 'Income' ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
          {row.type === 'Income' ? '+' : '-'}
          {formatCurrency(row.amount, settings.currency)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search transactions..." />
        <Select options={TYPE_OPTIONS} value={type} onChange={(e) => setType(e.target.value)} className="sm:w-44" />
        <Select options={SORT_OPTIONS} value={sort} onChange={(e) => setSort(e.target.value)} className="sm:w-48" />
      </div>

      {combined.length === 0 ? <EmptyState title="No transactions found" message="Try adjusting your search or filters." /> : <Table columns={columns} data={combined} pageSize={10} />}
    </div>
  );
}
