import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, ShieldAlert, Lock, Key } from 'lucide-react';
import { store } from '../lib/store';
import { useStoreVersion } from '../lib/useStore';
import { SiteSettings } from '../types';

const inputClass =
  'w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 focus:outline-none';

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; danger?: boolean }> = ({ checked, onChange, danger }) => (
  <label className="relative inline-flex items-center cursor-pointer shrink-0">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
    <div
      className={`w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
        danger ? 'peer-checked:bg-red-500' : 'peer-checked:bg-brand-500'
      }`}
    />
  </label>
);

export const Settings: React.FC = () => {
  useStoreVersion();
  const liveSettings = store.getSettings();
  const admin = store.getCurrentAdmin();
  const [settings, setSettings] = useState<SiteSettings>(liveSettings);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Pick up the live values once they arrive from the database
  useEffect(() => {
    setSettings(liveSettings);
  }, [liveSettings]);

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => setSettings({ ...settings, [key]: value });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await store.updateSettings(settings);
    setSaving(false);
    setStatus(res.success ? { ok: true, text: 'Settings saved and live on the website.' } : { ok: false, text: res.message || 'Save failed.' });
    setTimeout(() => setStatus(null), 4000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setPassMsg({ ok: false, text: 'New password and confirmation do not match.' });
      return;
    }
    const res = await store.changeAdminPassword(newPass);
    setPassMsg({ ok: res.success, text: res.message || '' });
    if (res.success) {
      setNewPass('');
      setConfirmPass('');
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Platform Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Contact details, tracking IDs, announcement banner and maintenance mode for the public website.
        </p>
      </div>

      {/* Account security */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Change Password</h2>
            <p className="text-xs text-slate-500">Signed in as {admin?.email}</p>
          </div>
        </div>

        {passMsg && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
              passMsg.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {passMsg.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
            <span>{passMsg.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs items-end">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">New Password</label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Minimum 8 characters"
                className={`${inputClass} !pl-8`}
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Re-type new password"
                className={`${inputClass} !pl-8`}
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>
          <button type="submit" className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-sm transition-all">
            Update Password
          </button>
        </form>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Business Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Support Phone (shown publicly)</label>
              <input type="text" value={settings.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">WhatsApp Number (digits with country code)</label>
              <input type="text" value={settings.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Inquiries Email</label>
              <input type="email" value={settings.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Address</label>
              <input type="text" value={settings.address} onChange={(e) => set('address', e.target.value)} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">Business Hours</label>
              <input type="text" value={settings.business_hours} onChange={(e) => set('business_hours', e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Tracking */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Tracking</h2>
          <p className="text-[11px] text-slate-500 -mt-2">Leave blank to disable. Scripts load automatically for visitors when an ID is set.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Meta Pixel ID</label>
              <input type="text" value={settings.meta_pixel_id} placeholder="e.g. 123456789012345" onChange={(e) => set('meta_pixel_id', e.target.value.trim())} className={inputClass} />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Google Analytics 4 Measurement ID</label>
              <input type="text" value={settings.ga4_id} placeholder="e.g. G-XXXXXXXXXX" onChange={(e) => set('ga4_id', e.target.value.trim())} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Banner & maintenance */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900">Announcement & Maintenance</h2>

          <div className="space-y-3 pb-5 border-b border-slate-200 text-xs">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 block">Top Announcement Bar</span>
                <p className="text-[11px] text-slate-500">Shown above the header on every public page</p>
              </div>
              <Toggle checked={settings.announcement_active} onChange={(v) => set('announcement_active', v)} />
            </div>
            {settings.announcement_active && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <input
                  type="text"
                  value={settings.announcement_text}
                  onChange={(e) => set('announcement_text', e.target.value)}
                  placeholder="Banner text"
                  className={`${inputClass} sm:col-span-2`}
                />
                <input
                  type="text"
                  value={settings.announcement_link}
                  onChange={(e) => set('announcement_link', e.target.value)}
                  placeholder="Link, e.g. /pricing"
                  className={inputClass}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-red-600 block">Maintenance Mode</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Visitors see a maintenance screen instead of the website. The admin portal keeps working.
              </p>
            </div>
            <Toggle danger checked={settings.maintenance_mode} onChange={(v) => set('maintenance_mode', v)} />
          </div>
        </div>

        {status && (
          <div
            className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
              status.ok ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-800'
            }`}
          >
            {status.ok ? <CheckCircle2 className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
            <span>{status.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </form>
    </div>
  );
};
