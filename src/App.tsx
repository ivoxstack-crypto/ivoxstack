import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DigitalAuditPage } from './pages/DigitalAuditPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { 
  PrivacyPolicyPage, 
  TermsPage, 
  RefundPolicyPage, 
  CookiePolicyPage, 
  RevisionPolicyPage 
} from './pages/legal/LegalPages';

// Admin Operations Portal
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { Dashboard } from './admin/Dashboard';
import { LeadsCRM } from './admin/LeadsCRM';
import { LeadDetail } from './admin/LeadDetail';
import { Clients } from './admin/Clients';
import { Projects } from './admin/Projects';
import { Invoices } from './admin/Invoices';
import { ServicesCMS } from './admin/ServicesCMS';
import { PortfolioCMS } from './admin/PortfolioCMS';
import { Reports } from './admin/Reports';
import { ActivityLogs } from './admin/ActivityLogs';
import { Settings } from './admin/Settings';
import { BackupSecurity } from './admin/BackupSecurity';

import { store } from './lib/store';
import { getUTMParams, loadTrackingScripts, trackPageView } from './lib/analytics';
import { useStoreVersion } from './lib/useStore';
import { Wrench, Loader2 } from 'lucide-react';
import { buildWhatsAppUrl } from './lib/utils';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Scroll to top and record a page view on every route change
function RouteChangeEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView();
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadDefaultService, setLeadDefaultService] = useState<string | undefined>();
  useStoreVersion();
  const settings = store.getSettings();
  const isStaff = Boolean(store.getCurrentAdmin());

  useEffect(() => {
    getUTMParams();
  }, []);

  useEffect(() => {
    loadTrackingScripts(settings.meta_pixel_id, settings.ga4_id);
  }, [settings.meta_pixel_id, settings.ga4_id]);

  const handleOpenLeadModal = (serviceName?: string) => {
    setLeadDefaultService(serviceName);
    setIsLeadModalOpen(true);
  };

  return (
    <BrowserRouter>
      <RouteChangeEffects />

      <Routes>
        {/* Secure Operations Admin Portal Routes */}
        <Route path="/operationsbyivox/login" element={<AdminLogin />} />
        
        <Route path="/operationsbyivox" element={<AdminLayout />}>
          <Route index element={<Navigate to="/operationsbyivox/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<LeadsCRM />} />
          <Route path="leads/:id" element={<LeadDetail />} />
          <Route path="clients" element={<Clients />} />
          <Route path="projects" element={<Projects />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="services" element={<ServicesCMS />} />
          <Route path="portfolio" element={<PortfolioCMS />} />
          <Route path="reports" element={<Reports />} />
          <Route path="activity" element={<ActivityLogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="backup" element={<BackupSecurity />} />
        </Route>

        {/* Public Website Routes */}
        <Route
          path="/*"
          element={
            !store.isPublicReady() ? (
              <div className="min-h-screen flex items-center justify-center">
                <div className="bg-aurora" aria-hidden="true" />
                <Loader2 className="w-6 h-6 text-brand-500 animate-spin" aria-label="Loading" />
              </div>
            ) : settings.maintenance_mode && !isStaff ? (
              <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div className="bg-aurora" aria-hidden="true" />
                <div className="max-w-md p-10 rounded-[28px] glass-strong space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm text-brand-600 flex items-center justify-center mx-auto">
                    <Wrench className="w-7 h-7" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-950">We'll be right back</h1>
                  <p className="text-sm text-slate-600">
                    IvoxStack is getting a quick upgrade. We will be back online shortly.
                  </p>
                  <a
                    href={buildWhatsAppUrl('Hello IvoxStack, inquiry during maintenance mode.', settings.whatsapp)}
                    className="btn btn-whatsapp"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Contact via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="min-h-screen flex flex-col text-slate-900 overflow-x-clip">
                <div className="bg-aurora" aria-hidden="true" />
                {settings.maintenance_mode && (
                  <div className="relative z-50 bg-amber-100 border-b border-amber-300 text-amber-900 text-xs font-semibold text-center px-4 py-2">
                    Maintenance mode is ON — visitors see the maintenance screen. You can see the site because you are signed in as staff.
                  </div>
                )}
                <Header onOpenLeadModal={handleOpenLeadModal} />
                
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage onOpenLeadModal={handleOpenLeadModal} />} />
                    <Route path="/services" element={<ServicesPage onOpenLeadModal={handleOpenLeadModal} />} />
                    <Route path="/pricing" element={<PricingPage onOpenLeadModal={handleOpenLeadModal} />} />
                    <Route path="/portfolio" element={<PortfolioPage onOpenLeadModal={handleOpenLeadModal} />} />
                    <Route path="/case-studies" element={<CaseStudiesPage onOpenLeadModal={handleOpenLeadModal} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/audit" element={<DigitalAuditPage />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    
                    {/* Legal Routes */}
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/refund-policy" element={<RefundPolicyPage />} />
                    <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                    <Route path="/revision-policy" element={<RevisionPolicyPage />} />

                    {/* 404 Catch-All */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>

                <Footer />

                <LeadModal
                  isOpen={isLeadModalOpen}
                  onClose={() => setIsLeadModalOpen(false)}
                  defaultService={leadDefaultService}
                />

                <FloatingWhatsApp />
              </div>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
