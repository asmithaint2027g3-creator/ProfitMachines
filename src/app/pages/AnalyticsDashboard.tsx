import React, { useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState<DashboardTabId>('mission_control');
  const [filters, setFilters] = useState<GlobalFilters>(DEFAULT_FILTERS);
  const [dashboardData, setDashboardData] = useState<FullDashboardState>(INITIAL_DASHBOARD_DATA);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Initial load
  useEffect(() => {
    document.title = 'Enterprise Intelligence & Telemetry | ProfitMachines';
    window.scrollTo(0, 0);

    const loadData = async () => {
      setIsRefreshing(true);
      const data = await fetchSheet2DashboardData();
      setDashboardData(data);
      setIsRefreshing(false);
    };

    loadData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const data = await fetchSheet2DashboardData(true);
    setDashboardData(data);
    setTimeout(() => setIsRefreshing(false), 450);
  };

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
