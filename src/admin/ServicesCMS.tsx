import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { store } from '../lib/store';
import { useStoreVersion } from '../lib/useStore';
import { ServiceItem } from '../types';
import { formatINR } from '../lib/utils';

export const ServicesCMS: React.FC = () => {
  useStoreVersion();
  const services = store.getAllServices();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDesc, setEditDesc] = useState<string>('');

  const handleStartEdit = (srv: ServiceItem) => {
    setEditingId(srv.id);
    setEditPrice(srv.starting_price);
    setEditDesc(srv.short_description);
  };

  const handleSave = async (id: string) => {
    const res = await store.updateService(id, {
      starting_price: Number(editPrice),
      short_description: editDesc,
    });
    if (res.success) setEditingId(null);
    else alert(`Could not save: ${res.message}`);
  };

  const handleToggleActive = async (srv: ServiceItem) => {
    const res = await store.updateService(srv.id, { is_active: !srv.is_active });
    if (!res.success) alert(`Could not update: ${res.message}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Services Content Management (CMS)</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Dynamically modify public service pricing, descriptions, and active status without recompiling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv, idx) => {
          const cmsThemes = [
            'card-theme-blue',
            'card-theme-orange',
            'card-theme-emerald',
            'card-theme-purple',
            'card-theme-cyan',
            'card-theme-amber',
            'card-theme-indigo',
          ];
          const currentTheme = cmsThemes[idx % cmsThemes.length];

          return (
            <div key={srv.id} className={`p-6 rounded-3xl card-interactive space-y-4 flex flex-col justify-between ${currentTheme}`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    srv.is_active ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {srv.is_active ? 'Live on Site' : 'Hidden'}
                  </span>

                  <button
                    onClick={() => handleToggleActive(srv)}
                    className="text-[10px] text-slate-500 hover:text-slate-900 underline font-semibold"
                  >
                    {srv.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>

                <h3 className="text-base font-black text-slate-900">{srv.name}</h3>

                {editingId === srv.id ? (
                  <div className="space-y-3 mt-3 bg-white/90 p-3.5 rounded-2xl border border-slate-200">
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">Starting Price (INR)</label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full p-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">Short Description</label>
                      <textarea
                        rows={3}
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full p-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(srv.id)}
                        className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs"
                      >
                        Save Live Changes
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <div className="text-xl font-black text-brand-600 mb-2">
                      {formatINR(srv.starting_price)}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{srv.short_description}</p>
                  </div>
                )}
              </div>

              {editingId !== srv.id && (
                <div className="pt-4 border-t border-slate-200/70 flex justify-end">
                  <button
                    onClick={() => handleStartEdit(srv)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-600 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Service Details</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
