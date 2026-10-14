import React, { useState } from 'react';
import {
  Calendar,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Clock,
  Sparkles
} from 'lucide-react';
import { GlobalFilters, DEFAULT_FILTERS } from '../../../lib/sheet2DataService';

interface FilterBarProps {
  filters: GlobalFilters;
  onFilterChange: (filters: GlobalFilters) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
  isLiveFeed: boolean;
  onToggleMobileSidebar: () => void;
}

export default function AnalyticsFilterBar({
  filters,
  onFilterChange,
  onRefresh,
  isRefreshing,
  lastUpdated,
  isLiveFeed,
  onToggleMobileSidebar
}: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (patch: Partial<GlobalFilters>) => {
    onFilterChange({ ...filters, ...patch });
  };

  const resetFilters = () => {
    onFilterChange(DEFAULT_FILTERS);
  };

  const hasActiveCustomFilters =
    filters.trafficSource !== 'all' ||
    filters.utmSource !== 'all' ||
    filters.utmMedium !== 'all' ||
    filters.utmCampaign !== 'all' ||
    filters.page !== 'all' ||
    filters.location !== 'all' ||
    filters.device !== 'all' ||
    filters.visitorType !== 'all';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-8 space-y-4">
      {/* Top primary controls row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Mobile menu trigger + Date selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Open navigation menu"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Date range pills */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 flex flex-wrap items-center gap-1 text-xs font-semibold">
            {[
              { id: 'today', label: 'Today' },
              { id: 'yesterday', label: 'Yesterday' },
              { id: '7d', label: 'Last 7D' },
              { id: '30d', label: 'Last 30D' },
              { id: 'this_month', label: 'This Month' },
              { id: 'prev_month', label: 'Prev Month' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => update({ dateRange: d.id as any })}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  filters.dateRange === d.id
                    ? 'bg-[#2878B5] text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Visitor Type Toggle */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 flex items-center gap-1 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Visitors' },
              { id: 'new', label: 'New' },
              { id: 'returning', label: 'Returning' }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => update({ visitorType: v.id as any })}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  filters.visitorType === v.id
                    ? 'bg-[#2878B5] text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Toggle Advanced Filters Button */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showAdvanced || hasActiveCustomFilters
                ? 'bg-[#2878B5]/15 border-emerald-600/40 text-emerald-400'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveCustomFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {hasActiveCustomFilters && (
            <button
              onClick={resetFilters}
              className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live status & Refresh action */}
        <div className="flex flex-wrap items-center gap-3 self-end lg:self-center">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className={`w-2 h-2 rounded-full ${isLiveFeed ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400'}`} />
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Updated: {lastUpdated}</span>
          </div>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#2878B5] hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Analytics</span>
          </button>
        </div>
      </div>

      {/* Advanced Drawer Row */}
      {showAdvanced && (
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Traffic Source */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Traffic Source</label>
            <select
              value={filters.trafficSource}
              onChange={(e) => update({ trafficSource: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Sources</option>
              <option value="google">Google Organic / Search</option>
              <option value="google_ads">Google Paid (CPC)</option>
              <option value="direct">Direct Bookmarks</option>
              <option value="linkedin">LinkedIn & B2B</option>
              <option value="facebook">Meta / Facebook</option>
              <option value="youtube">YouTube</option>
              <option value="partner">Partners & Affiliates</option>
            </select>
          </div>

          {/* UTM Campaign */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">UTM Campaign</label>
            <select
              value={filters.utmCampaign}
              onChange={(e) => update({ utmCampaign: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Campaigns</option>
              <option value="enterprise_ai">Enterprise-AI-Revenue</option>
              <option value="growth_launch">Growth-Protocol-Launch</option>
              <option value="automation_b2b">Scale-Automation-B2B</option>
              <option value="tech_demo">Autonomous-Tech-Demo</option>
            </select>
          </div>

          {/* UTM Medium */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">UTM Medium</label>
            <select
              value={filters.utmMedium}
              onChange={(e) => update({ utmMedium: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Mediums</option>
              <option value="cpc">Paid Search (CPC)</option>
              <option value="organic">Organic</option>
              <option value="paid_social">Paid Social</option>
              <option value="referral">Referral</option>
              <option value="email">Email Campaign</option>
            </select>
          </div>

          {/* Target Page */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Page Route</label>
            <select
              value={filters.page}
              onChange={(e) => update({ page: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Pages</option>
              <option value="/">Homepage (/)</option>
              <option value="/solutions">/solutions</option>
              <option value="/offerings">/offerings</option>
              <option value="/book-consultation">/book-consultation</option>
              <option value="/industries">/industries</option>
              <option value="/career">/career</option>
            </select>
          </div>

          {/* Geo Location */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Location</label>
            <select
              value={filters.location}
              onChange={(e) => update({ location: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Locations</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="SG">Singapore</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
          </div>

          {/* Device / OS */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Device / OS</label>
            <select
              value={filters.device}
              onChange={(e) => update({ device: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Devices</option>
              <option value="desktop">Desktop (macOS / Windows)</option>
              <option value="mobile">Mobile (iOS / Android)</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
