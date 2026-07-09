'use client';

import { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useSettings } from '../../context/SettingsContext';
import { useDebounce } from '../../hooks/useDebounce';
import { useModal } from '../../hooks/useModal';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import SearchInput from '../ui/SearchInput';
import EmptyState from '../ui/EmptyState';
import ConfirmDialog from '../ui/ConfirmDialog';
import IncomeForm from './IncomeForm';
import IncomeFilters from './IncomeFilters';
import { INCOME_CATEGORIES } from '../../data/categories'
import { formatCurrency } from '../../utils/currency'
import { formatDate, isBetween } from '../../utils/date'

export default function IncomeTable() {
  const { income, addIncome, updateIncome, deleteIncome } = useFinance();
  const { settings } = useSettings();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [category, setCategory] = useState('All Categories');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const formModal = useModal();
  const confirmModal = useModal();

  const filtered = useMemo(() => {
    return income
      .filter((item) => (category === 'All Categories' ? true : item.category === category))
      .filter((item) => isBetween(item.date, startDate, endDate))
      .filter(
        (item) =>
          (item.note || '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [income, category, startDate, endDate, debouncedSearch]);

  const handleFormSubmit = (data) => {
    if (formModal.payload) {
      updateIncome(formModal.payload.id, data);
    } else {
      addIncome(data);
    }
  };

  const handleConfirmDelete = () => {
    if (confirmModal.payload) {
      deleteIncome(confirmModal.payload.id);
    }
  };

  const columns = [
    { key: 'date', label: 'Date', render: (row) => formatDate(row.date) },
    { key: 'category', label: 'Category', render: (row) => <Badge color="emerald">{row.category}</Badge> },
    { key: 'note', label: 'Note', render: (row) => row.note || '—' },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => <span className="text-emerald-400 font-semibold">+{formatCurrency(row.amount, settings.currency)}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => formModal.open(row)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => confirmModal.open(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Search income..." />
          <IncomeFilters
            category={category}
            onCategoryChange={setCategory}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            categories={INCOME_CATEGORIES}
          />
        </div>
        <Button onClick={() => formModal.open(null)}>+ Add Income</Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No income records"
          message="Add your first income entry to get started."
          action={<Button onClick={() => formModal.open(null)}>+ Add Income</Button>}
        />
      ) : (
        <Table columns={columns} data={filtered} />
      )}

      <IncomeForm
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        initialData={formModal.payload}
        onSubmit={handleFormSubmit}
      />

      {confirmModal.payload && (
        <ConfirmDialog
          isOpen={confirmModal.isOpen}
          onClose={confirmModal.close}
          onConfirm={handleConfirmDelete}
          title="Delete Income"
          message="Are you sure you want to delete this income entry?"
        />
      )}
    </div>
  );
}