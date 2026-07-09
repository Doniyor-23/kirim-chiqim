'use client';

import Select from '../ui/Select';
import Input from '../ui/Input';

export default function IncomeFilters({ category, onCategoryChange, startDate, endDate, onStartDateChange, onEndDateChange, categories }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select options={['All Categories', ...categories]} value={category} onChange={(e) => onCategoryChange(e.target.value)} className="sm:w-48" />
      <Input type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)} className="sm:w-40" />
      <Input type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} className="sm:w-40" />
    </div>
  );
}
