import React from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileSpreadsheet, 
  Sliders, 
  DollarSign, 
  Image, 
  Loader2, 
  BarChart3, 
  History, 
  Settings as SettingsIcon, 
  ShieldCheck, 
  LogOut, 
  ExternalLink
} from 'lucide-react';
import { store } from '../lib/store';
import { useStoreVersion } from '../lib/useStore';

export const AdminLayout: React.FC = () => {
  useStoreVersion();
  const location = useLocation();
  const navigate = useNavigate();
  const currentAdmin = store.getCurrentAdmin();

  // Wait for the saved Supabase session to be checked before deciding
  if (!store.isAuthChecked()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (!currentAdmin) {
    return <Navigate to="/operationsbyivox/login" replace />;
  }

  const handleLogout = async () => {
    await store.logoutAdmin();
    navigate('/operationsbyivox/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/operationsbyivox/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Leads & CRM', path: '/operationsbyivox/leads', icon: <Users className="w-4 h-4" /> },
    { name: 'Clients', path: '/operationsbyivox/clients', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Projects', path: '/operationsbyivox/projects', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { name: 'Invoices & Payments', path: '/operationsbyivox/invoices', icon: <DollarSign className="w-4 h-4" /> },
    { name: 'Services CMS', path: '/operationsbyivox/services', icon: <Sliders className="w-4 h-4" /> },
    { name: 'Portfolio CMS', path: '/operationsbyivox/portfolio', icon: <Image className="w-4 h-4" /> },
    { name: 'Reports & Analytics', path: '/operationsbyivox/reports', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Activity & Audit', path: '/operationsbyivox/activity', icon: <History className="w-4 h-4" /> },
    { name: 'Platform Settings', path: '/operationsbyivox/settings', icon: <SettingsIcon className="w-4 h-4" /> },
    { name: 'Backup & Security', path: '/operationsbyivox/backup', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex text-slate-800 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex shadow-xs">
        <div>
          {/* Logo & Portal Badge */}
          <div className="p-6 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-3">
              <img src="/ivoxstack-icon-transparent.png" alt="IvoxStack" className="h-9 w-auto shrink-0" />
              <div>
                <span className="text-base font-black text-slate-900">IvoxStack</span>
                <span className="block text-[9px] font-extrabold uppercase tracking-widest text-brand-600">
                  OPERATIONS PLATFORM
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-bold shadow-2xs border-r-2 border-brand-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-brand-600' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 truncate">{currentAdmin.full_name}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                {currentAdmin.role}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block truncate">{currentAdmin.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-xs font-semibold transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
              title="Logout Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Navbar Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2">
            <img src="/ivoxstack-icon-transparent.png" alt="IvoxStack" className="h-7 w-auto shrink-0" />
            <span className="text-sm font-bold text-slate-900">IvoxStack Ops</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/operationsbyivox/dashboard" className="text-xs px-2.5 py-1 rounded-lg bg-brand-600 text-white font-bold">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="p-1 text-red-500">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Outlet Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
