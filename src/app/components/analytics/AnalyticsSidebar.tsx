import React from 'react';
import {
  Gauge,
  Briefcase,
  Megaphone,
  Globe2,
  PieChart,
  Laptop,
  CalendarDays,
  TrendingUp,
  Fingerprint,
  Grid3X3,
  GitMerge,
  Filter,
  Award,
  BarChart2,
  Activity,
  Link2,
  ChevronRight,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export type DashboardTabId =
  | 'mission_control'
  | 'executive_kpis'
  | 'ad_intelligence'
  | 'geo_map'
  | 'visitor_ratio'
  | 'tech_profile'
  | 'daily_heatmap'
  | 'growth_momentum'
  | 'identity_linker'
  | 'co_occurrence'
  | 'sankey_flow'
  | 'funnel_drop_off'
  | 'lead_scoring'
  | 'pareto_80_20'
  | 'std_deviation'
  | 'broken_link_qa';

interface NavGroup {
  name: string;
  items: Array<{
    id: DashboardTabId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }>;
}

const NAV_GROUPS: NavGroup[] = [
  {
    name: 'Overview',
    items: [
      { id: 'mission_control', label: 'Mission Control', icon: Gauge, badge: 'Live' },
      { id: 'executive_kpis', label: 'Executive KPIs', icon: Briefcase }
    ]
  },
  {
    name: 'Acquisition',
    items: [
      { id: 'ad_intelligence', label: 'Ad Intelligence', icon: Megaphone }
    ]
  },
  {
    name: 'Audience',
    items: [
      { id: 'geo_map', label: 'Geo Map Profile', icon: Globe2 },
      { id: 'visitor_ratio', label: 'Visitor Ratio', icon: PieChart },
      { id: 'tech_profile', label: 'Technology Profile', icon: Laptop }
    ]
  },
  {
    name: 'Behaviour',
    items: [
      { id: 'daily_heatmap', label: 'Daily Heatmap', icon: CalendarDays },
      { id: 'growth_momentum', label: 'Growth Momentum', icon: TrendingUp },
      { id: 'identity_linker', label: 'Identity Linker', icon: Fingerprint },
      { id: 'co_occurrence', label: 'Co-Occurrence Matrix', icon: Grid3X3 },
      { id: 'sankey_flow', label: 'Sankey Flow', icon: GitMerge }
    ]
  },
  {
    name: 'Conversion',
    items: [
      { id: 'funnel_drop_off', label: 'Funnel Drop-Off', icon: Filter },
      { id: 'lead_scoring', label: 'Lead Scoring Engine', icon: Award, badge: 'AI' }
    ]
  },
  {
    name: 'Performance',
    items: [
      { id: 'pareto_80_20', label: 'Pareto 80/20', icon: BarChart2 },
      { id: 'std_deviation', label: 'Standard Deviation', icon: Activity }
    ]
  },
  {
    name: 'Technical QA',
    items: [
      { id: 'broken_link_qa', label: 'Broken Link QA', icon: Link2 }
    ]
  }
];

interface SidebarProps {
  activeTab: DashboardTabId;
  onTabChange: (tab: DashboardTabId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export default function AnalyticsSidebar({
  activeTab,
  onTabChange,
  isOpenMobile,
  onCloseMobile
}: SidebarProps) {
  const renderNavContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#064e3b] to-emerald-600 flex items-center justify-center font-mono font-bold text-white shadow-md shadow-blue-500/20 text-sm">
            ISI
          </div>
          <div>
            <div className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
              ISI Intelligence
            </div>
            <div className="text-[11px] font-mono text-slate-400">Sheet 1 & 2 Engine</div>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={gIdx}>
            <div className="px-3 mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              {group.name}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                      isActive
                        ? 'bg-[#064e3b] text-white shadow-md shadow-emerald-900/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* System status footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">Sheet 2 Master Builder Active</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1">
          Zero Form Modification • Encrypted API
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-slate-950 border-r border-slate-800 min-h-[calc(100vh-5rem)] sticky top-20 self-start">
        {renderNavContent()}
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 shadow-2xl z-50">
            {renderNavContent()}
          </div>
        </div>
      )}
    </>
  );
}
