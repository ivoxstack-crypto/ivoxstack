import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Phone } from 'lucide-react';

export const NotFoundPage: React.FC = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-4 py-24">
    <div className="bg-aurora" aria-hidden="true" />
    <div className="max-w-xl w-full text-center p-10 sm:p-14 rounded-[32px] glass-strong space-y-6">
      <div className="font-display text-8xl sm:text-9xl font-extrabold tracking-tighter text-highlight">404</div>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">Page not found</h1>
        <p className="text-sm text-slate-600">
          The page you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>
      </div>
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="btn btn-primary">
          <Home className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
        <Link to="/services" className="btn btn-glass">
          <Compass className="w-4 h-4" />
          <span>Services</span>
        </Link>
        <Link to="/contact" className="btn btn-glass">
          <Phone className="w-4 h-4" />
          <span>Contact</span>
        </Link>
      </div>
    </div>
  </div>
);
