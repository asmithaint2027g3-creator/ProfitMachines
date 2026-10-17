import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import { LeadModalProvider } from './context/LeadModalContext';
import { VisitorEngagementProvider } from './context/VisitorEngagementContext';
import SmartEngagementManager from './components/engagement/SmartEngagementManager';
import GlobalLeadModal from './components/forms/GlobalLeadModal';
import TabExitPopup from './components/TabExitPopup';
import StickyCtaBar from './components/StickyCtaBar';
import WhatsAppWidget from './components/WhatsAppWidget';
import { servicesData } from '../data/navigationContent';

import { useAnalytics } from '../hooks/useAnalytics';
import { useTrafficAnalysis } from '../hooks/useTrafficAnalysis';
import { useContextAwareChat } from '../hooks/useContextAwareChat';
import { useVisitorTracker } from '../hooks/useVisitorTracker';

import Home from './pages/Home';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return null;
}

const BookConsultation = lazy(() => import('./pages/BookConsultation'));
const Crypto = lazy(() => import('./pages/Crypto'));
const Outcomes = lazy(() => import('./pages/Outcomes'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Capabilities = lazy(() => import('./pages/Capabilities'));
const Industries = lazy(() => import('./pages/Industries'));
const Offerings = lazy(() => import('./pages/Offerings'));
const Resources = lazy(() => import('./pages/Resources'));
const Company = lazy(() => import('./pages/Company'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Security = lazy(() => import('./pages/Security'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Copyright = lazy(() => import('./pages/Copyright'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const DemandPulse = lazy(() => import('./pages/DemandPulse'));
const Partners = lazy(() => import('./pages/Partners'));
const Career = lazy(() => import('./pages/Career'));
const TalkToExpert = lazy(() => import('./pages/TalkToExpert'));
const AIDemandDiscovery = lazy(() => import('./pages/AIDemandDiscovery'));
const AILeadGeneration = lazy(() => import('./pages/AILeadGeneration'));
const AILeadNurturing = lazy(() => import('./pages/AILeadNurturing'));
const AIMVPValidation = lazy(() => import('./pages/AIMVPValidation'));
const AILeadSalesTransformation = lazy(() => import('./pages/AILeadSalesTransformation'));
const AIRevenueOperations = lazy(() => import('./pages/AIRevenueOperations'));
const AIRevenueAcceleration = lazy(() => import('./pages/AIRevenueAcceleration'));
const BehaviourAnalytics = lazy(() => import('./pages/BehaviourAnalytics'));
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const AIBrandAcceleration = lazy(() => import('./pages/AIBrandAcceleration'));
const AIReputationAcceleration = lazy(() => import('./pages/AIReputationAcceleration'));
const DiscoveryPage = lazy(() => import('./pages/DiscoveryPage'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const VisitorDashboard = lazy(() => import('./pages/VisitorDashboard'));
const LinkedInStudio = lazy(() => import('./pages/LinkedInStudio'));
const YouTubeDashboard = lazy(() => import('./pages/YouTubeDashboard'));

function AnalyticsTracker() {
  useAnalytics();
  useTrafficAnalysis();
  useContextAwareChat();
  useVisitorTracker(); // Auto-tracks every visitor to Airtable
  return null;
}

// Fallback loader for lazy pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-[#2878B5] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function NavigateToIndustriesSection() {
  const { slug } = useParams<{ slug: string }>();
  if (slug && servicesData[slug]) {
    return <ServiceDetail />;
  }
  return <Industries />;
}

function NavigateToExploreSection() {
  const { slug } = useParams<{ slug: string }>();
  if (slug && servicesData[slug]) {
    return <ServiceDetail />;
  }
  if (slug?.startsWith('crypto-')) {
    return <Navigate to={`/crypto#${slug}`} replace />;
  }
  return <ServiceDetail />;
}

function NavigateToOfferingSection() {
  return <DiscoveryPage />;
}

function NavigateToSolutionsSection() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/solutions#${slug}`} replace />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <LeadModalProvider>
        <VisitorEngagementProvider>
          <AnalyticsTracker />
          <div className="min-h-screen bg-white pb-20 lg:pb-0">
            <Navigation />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/book-consultation" element={<BookConsultation />} />
                  <Route path="/crypto" element={<Crypto />} />
                  <Route path="/outcomes" element={<Outcomes />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/solutions/:slug" element={<NavigateToSolutionsSection />} />
                  <Route path="/capabilities" element={<Navigate to="/solutions" replace />} />
                  <Route path="/industries" element={<Industries />} />

                  <Route path="/offerings" element={<Offerings />} />
                  <Route path="/resources" element={<Resources />} />
                  {/* ── New consolidated service routes ── */}
                  <Route path="/services" element={<Navigate to="/offerings" replace />} />
                  <Route path="/services/ai-growth-engine" element={<ServicePage />} />
                  <Route path="/services/revenue-acceleration" element={<ServicePage />} />
                  <Route path="/services/lead-generation" element={<ServicePage />} />
                  <Route path="/services/demand-discovery" element={<ServicePage />} />
                  <Route path="/services/customer-discovery" element={<ServicePage />} />
                  <Route path="/services/competitive-discovery" element={<ServicePage />} />
                  <Route path="/services/product-market-fit" element={<ServicePage />} />
                  {/* ── New top-level routes ── */}
                  <Route path="/case-studies" element={<Navigate to="/#case-studies" replace />} />
                  <Route path="/blog" element={<Navigate to="/resources" replace />} />
                  <Route path="/company" element={<Company />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/copyright" element={<Copyright />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/demand-pulse" element={<DemandPulse />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/career" element={<Career />} />
                  <Route path="/talk-to-expert" element={<TalkToExpert />} />
                  <Route path="/offerings/b2b" element={<Navigate to="/offerings" replace />} />
                  <Route path="/ai-demand-discovery" element={<Navigate to="/solutions#ai-demand-discovery" replace />} />
                  <Route path="/ai-lead-generation" element={<Navigate to="/offerings#growth-engines" replace />} />
                  <Route path="/ai-lead-nurturing" element={<Navigate to="/offerings#growth-engines" replace />} />
                  <Route path="/ai-mvp-validation" element={<Navigate to="/offerings#growth-engines" replace />} />
                  <Route path="/ai-lead-sales-transformation" element={<Navigate to="/offerings/sales-acceleration" replace />} />
                  <Route path="/ai-revenue-operations" element={<Navigate to="/solutions#ai-revenue-operations" replace />} />
                  <Route path="/ai-revenue-acceleration" element={<Navigate to="/solutions#ai-revenue-acceleration" replace />} />
                  <Route path="/behaviour-analytics" element={<BehaviourAnalytics />} />
                  <Route path="/admin/visitors" element={<VisitorDashboard />} />
                  <Route path="/admin/linkedin" element={<LinkedInStudio />} />
                  <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
                  <Route path="/admin/youtube" element={<YouTubeDashboard />} />
                  {/* Legacy route redirects */}
                  <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
                  <Route path="/linkedin-studio" element={<Navigate to="/admin/linkedin" replace />} />
                  <Route path="/youtube" element={<Navigate to="/admin/youtube" replace />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/ai-brand-acceleration" element={<Navigate to="/solutions#ai-brand-acceleration" replace />} />
                  <Route path="/ai-reputation-acceleration" element={<Navigate to="/solutions#ai-reputation-acceleration" replace />} />
                  <Route path="/hidden-revenue-capture" element={<Navigate to="/solutions#hidden-revenue-capture" replace />} />
                  <Route path="/about" element={<Navigate to="/company#about" replace />} />
                  <Route path="/mission" element={<Navigate to="/company#mission" replace />} />
                  <Route path="/leadership" element={<Navigate to="/company#leadership" replace />} />
                  <Route path="/offices" element={<Navigate to="/company#offices" replace />} />
                  <Route path="/careers" element={<Navigate to="/career" replace />} />
                  <Route path="/contact" element={<Navigate to="/book-consultation" replace />} />
                  <Route path="/explore/:slug" element={<NavigateToExploreSection />} />
                  <Route path="/offerings/profit-pool-discovery" element={<DiscoveryPage />} />
                  <Route path="/offerings/profit-pool-discovery/:slug" element={<DiscoveryPage />} />
                  <Route path="/offerings/market-discovery" element={<Navigate to="/offerings/profit-pool-discovery/market-discovery" replace />} />
                  <Route path="/offerings/demand-discovery" element={<Navigate to="/offerings/profit-pool-discovery/demand-discovery" replace />} />
                  <Route path="/offerings/value-discovery" element={<Navigate to="/offerings/profit-pool-discovery/value-discovery" replace />} />
                  <Route path="/offerings/channel-discovery" element={<Navigate to="/offerings/profit-pool-discovery/channel-discovery" replace />} />
                  <Route path="/offerings/competitive-discovery" element={<Navigate to="/offerings/profit-pool-discovery/competitive-discovery" replace />} />
                  <Route path="/offerings/customer-discovery" element={<Navigate to="/offerings/profit-pool-discovery/customer-discovery" replace />} />
                  <Route path="/offerings/product-market-fit-discovery" element={<Navigate to="/offerings/profit-pool-discovery/product-market-fit-discovery" replace />} />
                  <Route path="/offerings/:type/:slug" element={<NavigateToOfferingSection />} />
                  <Route path="/industries/:slug" element={<NavigateToIndustriesSection />} />
                  <Route path="/offerings/:slug" element={<DiscoveryPage />} />
                  <Route path="/products" element={<Navigate to="/demand-pulse" replace />} />

                </Routes>
              </Suspense>
            </main>

            <ChatBot />
            <CookieConsent />
            <TabExitPopup />
            <StickyCtaBar />
            <WhatsAppWidget />
            <GlobalLeadModal />
            {/* Smart Visitor Engagement System — runs inside Router & both providers */}
            <SmartEngagementManager />
            <Footer />
          </div>
        </VisitorEngagementProvider>
      </LeadModalProvider>
    </Router>
  );
}
