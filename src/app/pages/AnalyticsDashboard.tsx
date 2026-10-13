import React, { useState, useEffect } from 'react';
import { Lock, Key, AlertCircle, LogOut, ShieldCheck } from 'lucide-react';
import AnalyticsSidebar, { DashboardTabId } from '../components/analytics/AnalyticsSidebar';
import AnalyticsFilterBar from '../components/analytics/AnalyticsFilterBar';
import { ModuleErrorBoundary } from '../components/analytics/ModuleErrorBoundary';

// 16 Dedicated Views for Sheet 2 Processed Tabs
import MissionControlView from '../components/analytics/views/MissionControlView';
import ExecutiveKPIsView from '../components/analytics/views/ExecutiveKPIsView';
import AdIntelligenceView from '../components/analytics/views/AdIntelligenceView';
import GeoMapProfileView from '../components/analytics/views/GeoMapProfileView';
import VisitorRatioView from '../components/analytics/views/VisitorRatioView';
import TechProfileView from '../components/analytics/views/TechProfileView';
import DailyHeatmapView from '../components/analytics/views/DailyHeatmapView';
import GrowthMomentumView from '../components/analytics/views/GrowthMomentumView';
import IdentityLinkerView from '../components/analytics/views/IdentityLinkerView';
import CoOccurrenceView from '../components/analytics/views/CoOccurrenceView';
import SankeyFlowView from '../components/analytics/views/SankeyFlowView';
import FunnelDropOffView from '../components/analytics/views/FunnelDropOffView';
import LeadScoringView from '../components/analytics/views/LeadScoringView';
import ParetoView from '../components/analytics/views/ParetoView';
import StdDeviationView from '../components/analytics/views/StdDeviationView';
import BrokenLinkQAView from '../components/analytics/views/BrokenLinkQAView';

import {
  GlobalFilters,
  DEFAULT_FILTERS,
  FullDashboardState,
  INITIAL_DASHBOARD_DATA,
  fetchSheet2DashboardData,
  applyFiltersToDashboard
} from '../../lib/sheet2DataService';

export default function AnalyticsDashboardPage() {
  // ── Admin Security Gate ──
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('pm_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // ── Dashboard State ──
  const [activeTab, setActiveTab] = useState<DashboardTabId>('mission_control');
  const [filters, setFilters] = useState<GlobalFilters>(DEFAULT_FILTERS);
  const [dashboardData, setDashboardData] = useState<FullDashboardState>(INITIAL_DASHBOARD_DATA);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Initial load — only fetch data once authenticated
  useEffect(() => {
    document.title = 'Enterprise Intelligence & Telemetry | ProfitMachines';
    window.scrollTo(0, 0);

    if (!isAuthenticated) return;

    const loadData = async () => {
      setIsRefreshing(true);
      const data = await fetchSheet2DashboardData();
      setDashboardData(data);
      setIsRefreshing(false);
    };

    loadData();
  }, [isAuthenticated]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const data = await fetchSheet2DashboardData(true);
    setDashboardData(data);
    setTimeout(() => setIsRefreshing(false), 450);
  };

  // ── Security Gate Handlers ──
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = passcode.trim();
    const validPasscodes = ['pm2026', 'profitmachines2026', 'profitmachines_analytics_secure_key_2026'];
    if (validPasscodes.includes(entered)) {
      sessionStorage.setItem('pm_admin_auth', 'true');
      sessionStorage.setItem('pm_admin_key', entered);
      setIsAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid Admin Passcode. Access denied.');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem('pm_admin_auth');
    sessionStorage.removeItem('pm_admin_key');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // ── Security Gate UI ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans">
        <div className="max-w-md w-full bg-slate-900/80 border border-emerald-600/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/8 rounded-full blur-xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 mb-5 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="text-center">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest">
              Restricted Admin Area
            </span>
            <h2 className="text-2xl font-black text-white mt-3 tracking-tight">
              Analytics Security Perimeter
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              The Enterprise Intelligence &amp; Telemetry dashboard contains sensitive business data. Only authorized administrators can access this system.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-emerald-300 mb-1.5">
                Admin Passcode / Security Key
              </label>
              <input
                type="password"
                value={passcode}
                onChange={e => { setPasscode(e.target.value); setPasscodeError(''); }}
                placeholder="Enter admin key"
                className="w-full bg-slate-950/80 border border-emerald-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition"
                autoFocus
              />
              {passcodeError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {passcodeError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" /> Unlock Analytics Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-emerald-800/30 text-center">
            <a
              href="/"
              className="text-xs text-slate-400 hover:text-emerald-300 transition"
            >
              ← Return to ProfitMachines Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Compute filtered dataset reactively
  const filteredData = applyFiltersToDashboard(dashboardData, filters);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'mission_control':
        return (
          <ModuleErrorBoundary moduleName="Mission Control">
            <MissionControlView data={filteredData.missionControl} />
          </ModuleErrorBoundary>
        );

      case 'executive_kpis':
        return (
          <ModuleErrorBoundary moduleName="Executive KPIs">
            <ExecutiveKPIsView data={filteredData.executiveKPIs} />
          </ModuleErrorBoundary>
        );

      case 'ad_intelligence':
        return (
          <ModuleErrorBoundary moduleName="Ad Intelligence">
            <AdIntelligenceView data={filteredData.adIntelligence} />
          </ModuleErrorBoundary>
        );

      case 'geo_map':
        return (
          <ModuleErrorBoundary moduleName="Geo Map Profile">
            <GeoMapProfileView data={filteredData.geoMap} />
          </ModuleErrorBoundary>
        );

      case 'visitor_ratio':
        return (
          <ModuleErrorBoundary moduleName="Visitor Ratio">
            <VisitorRatioView data={filteredData.visitorRatio} />
          </ModuleErrorBoundary>
        );

      case 'tech_profile':
        return (
          <ModuleErrorBoundary moduleName="Technology Profile">
            <TechProfileView data={filteredData.techProfile} />
          </ModuleErrorBoundary>
        );

      case 'daily_heatmap':
        return (
          <ModuleErrorBoundary moduleName="Daily Heatmap">
            <DailyHeatmapView data={filteredData.dailyHeatmap} />
          </ModuleErrorBoundary>
        );

      case 'growth_momentum':
        return (
          <ModuleErrorBoundary moduleName="Growth Momentum">
            <GrowthMomentumView data={filteredData.growthMomentum} />
          </ModuleErrorBoundary>
        );

      case 'identity_linker':
        return (
          <ModuleErrorBoundary moduleName="Identity Linker">
            <IdentityLinkerView data={filteredData.identityLinker} />
          </ModuleErrorBoundary>
        );

      case 'co_occurrence':
        return (
          <ModuleErrorBoundary moduleName="Co-Occurrence Matrix">
            <CoOccurrenceView data={filteredData.coOccurrence} />
          </ModuleErrorBoundary>
        );

      case 'sankey_flow':
        return (
          <ModuleErrorBoundary moduleName="Sankey Flow">
            <SankeyFlowView data={filteredData.sankeyFlow} />
          </ModuleErrorBoundary>
        );

      case 'funnel_drop_off':
        return (
          <ModuleErrorBoundary moduleName="Funnel Drop-Off">
            <FunnelDropOffView data={filteredData.funnelDropOff} />
          </ModuleErrorBoundary>
        );

      case 'lead_scoring':
        return (
          <ModuleErrorBoundary moduleName="Lead Scoring Engine">
            <LeadScoringView data={filteredData.leadScoring} />
          </ModuleErrorBoundary>
        );

      case 'pareto_80_20':
        return (
          <ModuleErrorBoundary moduleName="Pareto 80/20">
            <ParetoView data={filteredData.pareto} />
          </ModuleErrorBoundary>
        );

      case 'std_deviation':
        return (
          <ModuleErrorBoundary moduleName="Standard Deviation">
            <StdDeviationView data={filteredData.stdDeviation} />
          </ModuleErrorBoundary>
        );

      case 'broken_link_qa':
        return (
          <ModuleErrorBoundary moduleName="Broken Link QA">
            <BrokenLinkQAView data={filteredData.brokenLinkQA} />
          </ModuleErrorBoundary>
        );

      default:
        return <MissionControlView data={filteredData.missionControl} />;
    }
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-950 text-white font-sans flex">
      {/* 1. Left Fixed Sidebar */}
      <AnalyticsSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Dashboard Content Area */}
      <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Admin Authenticated Banner + Lock */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-300 font-semibold">Admin Session Active</span>
              {dashboardData.isLiveFeed && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                  ● LIVE
                </span>
              )}
            </div>
            <button
              onClick={handleLock}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 text-xs border border-slate-700/60 transition-all cursor-pointer"
              title="Lock Analytics Dashboard"
            >
              <LogOut className="w-3.5 h-3.5" /> Lock Dashboard
            </button>
          </div>

          {/* Universal Global Filter Bar */}
          <AnalyticsFilterBar
            filters={filters}
            onFilterChange={setFilters}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            lastUpdated={dashboardData.lastUpdated}
            isLiveFeed={dashboardData.isLiveFeed}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />

          {/* Active Processed Tab View */}
          <main className="pb-16">{renderActiveView()}</main>
        </div>
      </div>
    </div>
  );
}
