import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import { store } from '../lib/store';

export const BackupSecurity: React.FC = () => {
  const handleDownloadBackup = () => {
    const blob = new Blob([store.createBackupJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ivoxstack_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Backup & Security</h1>
        <p className="text-xs text-slate-500 mt-1">Export your data and review how the platform is protected.</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl card-theme-blue space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 border border-blue-200">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Download Data Backup</h2>
            <p className="text-xs text-slate-600">
              A JSON file of all leads, notes, clients, projects, invoices, services, portfolio, settings and logs. Supabase
              also keeps automatic daily database backups.
            </p>
          </div>
        </div>
        <button
          onClick={handleDownloadBackup}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Download JSON Backup</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl card-theme-emerald space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold">How your data is protected</h2>
        </div>
        <ul className="space-y-2 text-xs text-slate-700">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
            <span><strong>Staff-only access:</strong> sign-in uses Supabase Auth, and only accounts on the staff list can open this portal or read data.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
            <span><strong>Row Level Security:</strong> website visitors can only submit inquiries. They can never read leads, clients or any other records.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
            <span><strong>Anti-spam:</strong> hidden honeypot field and a minimum fill-time check on the inquiry forms, plus length limits enforced by the database.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
            <span><strong>Not indexed:</strong> robots.txt blocks search engines from the <code>/operationsbyivox</code> portal.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
