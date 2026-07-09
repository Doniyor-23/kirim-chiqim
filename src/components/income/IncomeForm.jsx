'use client';

import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { INCOME_CATEGORIES } from '../../data/categories';
import { todayISO } from '../../utils/date';

const emptyForm = { date: todayISO(), category: INCOME_CATEGORIES[0], amount: '', note: '' };

export default function IncomeForm({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) setForm({ date: initialData.date, category: initialData.category, amount: initialData.amount, note: initialData.note || '' });
    else setForm(emptyForm);
  }, [initialData, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.date) e.date = 'Date is required';
    if (!form.amount || Number(form.amount) <= 0) e.amount = 'Enter a valid amount';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, amount: Number(form.amount) });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Income' : 'Add Income'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} error={errors.date} />
        <Select label="Category" options={INCOME_CATEGORIES} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <Input label="Amount" type="number" step="0.01" placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} error={errors.amount} />
        <Textarea label="Note (optional)" placeholder="e.g. Lunch service" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initialData ? 'Save Changes' : 'Add Income'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
