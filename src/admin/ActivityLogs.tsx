import React, { useState } from 'react';
import { store } from '../lib/store';
import { useStoreVersion } from '../lib/useStore';

export const ActivityLogs: React.FC = () => {
  useStoreVersion();
  const [activeTab, setActiveTab] = useState<'activity' | 'audit'>('activity');
  const activityLogs = store.getActivityLogs();
  const auditLogs = store.getAuditLogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Activity & Audit Logs</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Traceable history of operations actions, state transitions, and CMS modifications.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'activity' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Activity Stream ({activityLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'audit' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            System Audit Trail ({auditLogs.length})
          </button>
        </div>
      </div>

      {activeTab === 'activity' ? (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Staff / User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 text-slate-500 font-mono">
                    {new Date(log.created_at).toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 font-bold text-slate-900">{log.user_name}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-brand-50 border border-brand-200 font-mono text-[10px] font-bold text-brand-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-slate-800 font-medium">{log.entity}</td>
                  <td className="p-4 text-slate-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Change Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((audit) => (
                <tr key={audit.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 text-slate-500 font-mono">
                    {new Date(audit.created_at).toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 font-bold text-slate-900">{audit.user_name}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200 font-mono text-[10px] font-bold text-orange-700">
                      {audit.action}
                    </span>
                  </td>
                  <td className="p-4 text-slate-800 font-semibold">{audit.entity}</td>
                  <td className="p-4 font-mono text-slate-500">{audit.new_value || audit.old_value || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
