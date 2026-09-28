import React, { useState } from 'react';
import { Plus, ExternalLink, Trash2 } from 'lucide-react';
import { store } from '../lib/store';
import { useStoreVersion } from '../lib/useStore';
import { PortfolioItem } from '../types';

const CATEGORIES: PortfolioItem['category'][] = ['Websites', 'Branding', 'Advertising', 'Creative Design', 'Social Media', 'Video'];

const inputClass =
  'w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500';

export const PortfolioCMS: React.FC = () => {
  useStoreVersion();
  const portfolio = store.getAllPortfolio();
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState<PortfolioItem['category']>('Websites');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  const resetForm = () => {
    setTitle('');
    setClient('');
    setCategory('Websites');
    setDescription('');
    setImage('');
    setProjectUrl('');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await store.addPortfolioItem({
      title,
      client: client || undefined,
      category,
      description,
      image,
      project_url: projectUrl || undefined,
      is_featured: true,
      is_published: true,
      display_order: portfolio.length + 1,
    });
    setSaving(false);
    if (!res.success) {
      alert(`Could not save: ${res.message}`);
      return;
    }
    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = async (item: PortfolioItem) => {
    if (!confirm(`Remove "${item.title}" from the portfolio?`)) return;
    const res = await store.deletePortfolioItem(item.id);
    if (!res.success) alert(`Could not remove: ${res.message}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Portfolio CMS</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Projects shown on the public Portfolio and Home pages.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Portfolio Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.length === 0 && (
          <div className="col-span-full p-10 rounded-3xl bg-white border border-dashed border-slate-300 text-center text-xs text-slate-400">
            No portfolio items yet.
          </div>
        )}
        {portfolio.map((item) => (
          <div key={item.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] rounded-2xl bg-slate-100 overflow-hidden mb-3 relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-sm">
                  {item.category}
                </span>
              </div>
              <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
              <p className="text-[11px] text-brand-600 font-bold mt-0.5">{item.client || 'Client Project'}</p>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
              {item.project_url ? (
                <a href={item.project_url} target="_blank" rel="noreferrer" className="text-orange-600 flex items-center gap-1 text-[11px] font-bold hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" /> Live site
                </a>
              ) : (
                <span className="text-slate-500 text-[11px] font-bold">Showcase</span>
              )}
              <button
                onClick={() => handleDelete(item)}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                title="Remove item"
                aria-label={`Remove ${item.title}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900">Add Portfolio Item</h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Project Title *</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Client Name</label>
                <input type="text" value={client} onChange={(e) => setClient(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PortfolioItem['category'])}
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://… or /image-in-public-folder.png"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Live Website URL</label>
                <input
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://client-site.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Description *</label>
                <textarea rows={2} required value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
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
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
