import React, { useState } from 'react';
import { Briefcase, Calendar, Plus, Clock, CheckCircle2 } from 'lucide-react';
import { store } from '../lib/store';
import { formatINR } from '../lib/utils';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(store.getProjects());
  const clients = store.getClients();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [service, setService] = useState('Website Design & Development');
  const [budget, setBudget] = useState(14999);
  const [deadline, setDeadline] = useState('2026-10-15');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === clientId);
    const newProj = store.addProject({
      client_id: clientId,
      client_name: client?.name || 'Client',
      name,
      service,
      status: 'Active',
      start_date: new Date().toISOString().split('T')[0],
      deadline,
      budget: Number(budget),
      team_member: 'Shubham Pandey',
    });
    setProjects(store.getProjects());
    setShowAddModal(false);
    setName('');
  };

  const statusColors: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    'Client Review': 'bg-purple-50 text-purple-700 border-purple-200',
    Revision: 'bg-amber-50 text-amber-700 border-amber-200',
    Delivered: 'bg-slate-100 text-slate-700 border-slate-200',
    'On Hold': 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Project Management</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Track sprint status, deadlines, budgets, and milestone deliveries.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, idx) => {
          const projectThemes = ['card-theme-blue', 'card-theme-orange', 'card-theme-indigo', 'card-theme-emerald'];
          const currentTheme = projectThemes[idx % projectThemes.length];

          return (
            <div key={p.id} className={`p-6 rounded-3xl card-interactive space-y-4 flex flex-col justify-between ${currentTheme}`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${statusColors[p.status] || ''}`}>
                    {p.status}
                  </span>
                  <span className="text-xs font-black text-slate-900">{formatINR(p.budget)}</span>
                </div>
                <h3 className="text-base font-black text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{p.client_name}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-200/70">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Service:</span>
                  <span className="text-slate-900 font-bold">{p.service}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Deadline:</span>
                  <span className="text-orange-600 font-mono font-bold">{p.deadline}</span>
                </div>
                {p.team_member && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Lead:</span>
                    <span className="text-slate-800 font-semibold">{p.team_member}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Create New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Website Redesign & Lead Funnel"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Client</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.company || 'Enterprise'})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Service Type</label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Budget (INR)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
