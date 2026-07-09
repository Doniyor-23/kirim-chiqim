'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'UZS'];
const THEMES = ['dark', 'light'];

export default function SettingsForm() {
  const { settings, updateSettings } = useSettings();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(settings), [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({ ...form, taxPercentage: Number(form.taxPercentage) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-300 mb-6">General Settings</h3>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input label="Restaurant Name" value={form.restaurantName} onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} />
        <Select label="Currency" options={CURRENCIES} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
        <Input label="Tax Percentage (%)" type="number" step="0.1" value={form.taxPercentage} onChange={(e) => setForm({ ...form, taxPercentage: e.target.value })} />
        <Select label="Theme" options={THEMES} value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })} />
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit">Save Settings</Button>
          {saved && <span className="text-sm text-emerald-400 animate-fadeIn">Saved successfully!</span>}
        </div>
      </form>
    </Card>
  );
}
