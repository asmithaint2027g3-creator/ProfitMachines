import React, { useState } from 'react';
import {
  Fingerprint,
  ArrowRight,
  ShieldCheck,
  Layers,
  Clock,
  Zap,
  Activity,
  UserCheck
} from 'lucide-react';
import { IdentityLinkerData } from '../../../../lib/sheet2DataService';

interface Props {
  data: IdentityLinkerData;
}

export default function IdentityLinkerView({ data }: Props) {
  const { totalIdentifiedProfiles, journeys } = data;
  const [selectedJourney, setSelectedJourney] = useState(journeys[0]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Graph Profiles</span>
            <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-400">
              <Fingerprint className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{totalIdentifiedProfiles.toLocaleString()}</div>
          <span className="text-xs text-slate-400">Resolved multi-session visitor chains</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Identity Resolution Accuracy</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">99.8%</div>
          <span className="text-xs text-slate-400">First-party cookie & local telemetry</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Privacy Safeguard</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">Zero PII</div>
          <span className="text-xs text-emerald-400 font-bold">100% Anonymized IDs & Aggregations</span>
        </div>
      </div>

      {/* 2. Visual Journey Graph */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Visitor Multi-Session Relationship Graph</h4>
            <p className="text-xs text-slate-400">
              Visitor ID → Sessions → Page Routes → Interaction Count → Engagement Tier
            </p>
          </div>

          {/* Profile Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Sample:</span>
            <select
              value={selectedJourney.visitorId}
              onChange={(e) => {
                const found = journeys.find((j) => j.visitorId === e.target.value);
                if (found) setSelectedJourney(found);
              }}
              className="bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-mono font-bold px-3 py-1.5 rounded-xl focus:outline-none"
            >
              {journeys.map((j) => (
                <option key={j.visitorId} value={j.visitorId}>
                  {j.visitorId} ({j.sessionCount} Sessions)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Journey Flow Ribbon */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-400">Profile ID: </span>
              <strong className="text-emerald-400 font-bold">{selectedJourney.visitorId}</strong>
            </div>
            <div>
              <span className="text-slate-400">First Touch Channel: </span>
              <span className="text-slate-200">{selectedJourney.firstTouchSource}</span>
            </div>
            <div>
              <span className="text-slate-400">Core Evaluation: </span>
              <span className="text-emerald-400">{selectedJourney.dominantCategory}</span>
            </div>
            <div>
              <span className="text-slate-400">Cumulative Interactions: </span>
              <span className="text-emerald-400 font-bold">{selectedJourney.totalInteractions}</span>
            </div>
          </div>

          {/* Progressive Stage Stepper */}
          <div className="mt-6 space-y-4">
            {selectedJourney.stages.map((stage, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#064e3b]/20 border border-emerald-600/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                    {sIdx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{stage.session}</span>
                      <span className="text-xs font-mono text-slate-400">• {stage.duration}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      {stage.pages.map((p, pIdx) => (
                        <span key={pIdx} className="text-[11px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto text-xs font-mono">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{stage.interactionsCount} actions</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    stage.engagementStatus === 'Lead'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                      : stage.engagementStatus === 'Opportunity'
                      ? 'bg-purple-950 text-teal-400 border border-purple-800/60'
                      : 'bg-[#02241e] text-emerald-400 border border-blue-800/60'
                  }`}>
                    {stage.engagementStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
