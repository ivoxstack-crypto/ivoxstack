import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Phone } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 bg-white">
      <div className="text-7xl sm:text-8xl font-black text-slate-900">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          The page you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs shadow-md shadow-orange-500/25 hover:scale-105 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/services"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs"
        >
          <Compass className="w-4 h-4" />
          <span>View Services</span>
        </Link>

        <Link
          to="/contact"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs"
        >
          <Phone className="w-4 h-4" />
          <span>Contact Us</span>
        </Link>
      </div>
    </div>
  );
};
