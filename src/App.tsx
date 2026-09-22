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
import { PricingCMS } from './admin/PricingCMS';
import { PortfolioCMS } from './admin/PortfolioCMS';
import { Reports } from './admin/Reports';
import { ActivityLogs } from './admin/ActivityLogs';
import { Settings } from './admin/Settings';
import { BackupSecurity } from './admin/BackupSecurity';

import { store } from './lib/store';
import { getUTMParams } from './lib/analytics';
import { Wrench } from 'lucide-react';
import { buildWhatsAppUrl } from './lib/utils';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadDefaultService, setLeadDefaultService] = useState<string | undefined>();
  const settings = store.getSettings();

  useEffect(() => {
    getUTMParams();
  }, []);

  const handleOpenLeadModal = (serviceName?: string) => {
    setLeadDefaultService(serviceName);
    setIsLeadModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />

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
          <Route path="orders" element={<Projects />} />
          <Route path="payments" element={<Invoices />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="services" element={<ServicesCMS />} />
          <Route path="pricing" element={<PricingCMS />} />
          <Route path="portfolio" element={<PortfolioCMS />} />
          <Route path="reports" element={<Reports />} />
          <Route path="activity" element={<ActivityLogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="backup" element={<BackupSecurity />} />
          <Route path="security" element={<BackupSecurity />} />
        </Route>

        {/* Legacy paths must return 404 for security */}
        <Route path="/operationsbyshubhu/*" element={<NotFoundPage />} />
        <Route path="/operationsbyshubhu" element={<NotFoundPage />} />
        <Route path="/operations/*" element={<NotFoundPage />} />
        <Route path="/operations" element={<NotFoundPage />} />

        {/* Public Website Routes */}
        <Route
          path="/*"
          element={
            settings.maintenance_mode ? (
              <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center text-slate-900">
                <div className="max-w-md p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-200">
                    <Wrench className="w-8 h-8" />
                  </div>
                  <h1 className="text-2xl font-black text-slate-900">IvoxStack Upgrades in Progress</h1>
                  <p className="text-xs text-slate-600">
                    We are performing routine cloud database optimizations. We will be back online shortly.
                  </p>
                  <a
                    href={buildWhatsAppUrl('Hello IvoxStack, inquiry during maintenance mode.', settings.whatsapp)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Contact via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
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

                {/* Lead Generation Modal */}
                <LeadModal
                  isOpen={isLeadModalOpen}
                  onClose={() => setIsLeadModalOpen(false)}
                  defaultService={leadDefaultService}
                />

                {/* Modern Floating WhatsApp Quick Connect */}
                <FloatingWhatsApp />
              </div>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
