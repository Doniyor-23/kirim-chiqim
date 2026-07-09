'use client';

import { useRef } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useModal } from '../../hooks/useModal';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function BackupRestore() {
  const { income, expenses, importData, resetAllData } = useFinance();
  const fileInputRef = useRef(null);
  const resetModal = useModal();

  const handleExport = () => {
    const data = { income, expenses, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `restaurant-finance-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        importData(data);
      } catch {
        alert('Invalid backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-300 mb-6">Backup & Data Management</h3>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={handleExport}>
          Export Backup (JSON)
        </Button>
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
          Import Backup
        </Button>
        <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
        <Button variant="danger" onClick={() => resetModal.open()}>
          Reset All Data
        </Button>
      </div>

      <ConfirmDialog
        isOpen={resetModal.isOpen}
        onClose={resetModal.close}
        onConfirm={resetAllData}
        title="Reset All Data"
        message="This will permanently delete all income and expense records and restore demo data. This action cannot be undone."
      />
    </Card>
  );
}
