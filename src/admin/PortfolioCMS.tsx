import React, { useState } from 'react';
import { Image, Plus, ExternalLink, FileText, Check } from 'lucide-react';
import { store } from '../lib/store';
import { PortfolioItem } from '../types';

export const PortfolioCMS: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(store.getPortfolio());
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState<PortfolioItem['category']>('Branding');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/itm-catalogue-preview.jpg');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    store.addPortfolioItem({
      title,
      client,
      category,
      description,
      image,
      is_featured: true,
      is_published: true,
      display_order: portfolio.length + 1,
    });
    setPortfolio([...store.getPortfolio()]);
    setShowAddModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Portfolio CMS</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Manage verified project decks, marketplace catalogues, and client showcases.</p>
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
        {portfolio.map((item, idx) => {
          const portThemes = ['card-theme-blue', 'card-theme-orange', 'card-theme-emerald', 'card-theme-purple'];
          const currentTheme = portThemes[idx % portThemes.length];

          return (
            <div key={item.id} className={`p-5 rounded-3xl card-interactive space-y-3 flex flex-col justify-between ${currentTheme}`}>
              <div>
                <div className="aspect-[16/9] rounded-2xl bg-slate-100 overflow-hidden mb-3 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 shadow-xs">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
                <p className="text-[11px] text-brand-600 font-bold mt-0.5">{item.client || 'Client Project'}</p>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                {item.pdf_url ? (
                  <span className="text-brand-600 flex items-center gap-1 text-[11px] font-bold">
                    <FileText className="w-3.5 h-3.5" /> PDF Attached
                  </span>
                ) : (
                  <span className="text-orange-600 flex items-center gap-1 text-[11px] font-bold">
                    <ExternalLink className="w-3.5 h-3.5" /> Web Portal
                  </span>
                )}
                <span className="text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                  Published
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Add Portfolio Item</h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Indian Trade Mart B2B Portal"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Client Name</label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. ITM Group"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PortfolioItem['category'])}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="Branding">Branding</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Catalogue">Catalogue</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500"
                />
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
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
