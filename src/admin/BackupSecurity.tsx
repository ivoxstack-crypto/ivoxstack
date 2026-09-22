import React, { useState } from 'react';
import { Download, Upload, ShieldCheck, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';
import { store } from '../lib/store';

export const BackupSecurity: React.FC = () => {
  const [restoreStatus, setRestoreStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleDownloadBackup = () => {
    const jsonStr = store.createBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ivoxstack_full_backup_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = store.restoreBackupJSON(content, 'SUPER_ADMIN');
        setRestoreStatus(res);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Database Backup & Platform Security</h1>
        <p className="text-xs text-slate-500 mt-1">Export complete system snapshots, restore data integrity, and review role access policies.</p>
      </div>

      {restoreStatus && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
          restoreStatus.success 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
            : 'bg-red-50 border-red-300 text-red-800'
        }`}>
          {restoreStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
          <span>{restoreStatus.message}</span>
        </div>
      )}

      {/* Backup Section */}
      <div className="p-6 sm:p-8 rounded-3xl card-theme-blue card-interactive space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 border border-blue-200">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Full Platform Snapshot Export</h2>
            <p className="text-xs text-slate-600">Creates a structured JSON backup of all leads, clients, projects, invoices, services, and audit logs.</p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleDownloadBackup}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Instant JSON Backup</span>
          </button>
        </div>
      </div>

      {/* Restore Section */}
      <div className="p-6 sm:p-8 rounded-3xl card-theme-amber card-interactive space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Database Restoration (Super Admin Only)</h2>
            <p className="text-xs text-slate-600">Upload a verified backup JSON file to restore platform state and write an immutable audit log entry.</p>
          </div>
        </div>

        <div className="pt-2">
          <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold cursor-pointer transition-all shadow-sm">
            <Upload className="w-4 h-4 text-amber-600" />
            <span>Upload & Restore Backup JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Security Architecture Notice */}
      <div className="p-6 sm:p-8 rounded-3xl card-theme-emerald card-interactive space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold">Security Enforcement & Compliance</h2>
        </div>
        <ul className="space-y-2 text-xs text-slate-700">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span><strong>Anti-Spam Shield:</strong> Honeypot rejection and submission time checking on all forms.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span><strong>Brute Force Lockout:</strong> 5 failed admin login attempts enforce an automated 15-minute lockout.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span><strong>Row Level Security:</strong> Public users can only submit inquiries; sensitive CRM and financial records require authenticated staff roles.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span><strong>SEO & URL Isolation:</strong> Robots.txt strictly disallows all indexing and crawling of <code>/operationsbyivox/*</code> and all administrative routes.</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
