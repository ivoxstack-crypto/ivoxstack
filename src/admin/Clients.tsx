import React from 'react';
import { Briefcase, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { store } from '../lib/store';
import { useStoreVersion } from '../lib/useStore';
import { buildWhatsAppUrl } from '../lib/utils';

export const Clients: React.FC = () => {
  useStoreVersion();
  const clients = store.getClients();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Client Management</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Manage verified clients converted from winning leads and ongoing retainers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length === 0 && (
          <div className="col-span-full p-10 rounded-3xl bg-white border border-dashed border-slate-300 text-center text-xs text-slate-400">
            No clients yet. Convert a lead from Leads &amp; CRM to create one.
          </div>
        )}
        {clients.map((c, idx) => {
          const clientThemes = ['card-theme-blue', 'card-theme-emerald', 'card-theme-purple', 'card-theme-orange'];
          const currentTheme = clientThemes[idx % clientThemes.length];

          return (
            <div key={c.id} className={`p-6 rounded-3xl card-interactive space-y-4 ${currentTheme}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {c.status}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-2">{c.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{c.company || 'Enterprise'}</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-brand-600">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-200/70">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">{c.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">{c.email}</span>
                </div>
                {c.assigned_manager && (
                  <div className="text-[11px] text-slate-500 mt-1">
                    Manager: <strong className="text-slate-800">{c.assigned_manager}</strong>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <a
                  href={buildWhatsAppUrl(`Hello ${c.name}, checking in from IvoxStack regarding your active deliverables.`, c.phone)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all border border-emerald-200 shadow-2xs hover:scale-105 group"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366] group-hover:fill-white" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-[10px] text-slate-400 font-medium">
                  Client since {new Date(c.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
