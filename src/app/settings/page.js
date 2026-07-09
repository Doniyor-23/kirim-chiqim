import SettingsForm from '../../components/settings/SettingsForm';
import BackupRestore from '../../components/settings/BackupRestore';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Settings</h2>
        <p className="text-sm text-slate-500">Configure your restaurant and application preferences</p>
      </div>
      <SettingsForm />
      <BackupRestore />
    </div>
  );
}
