import React, { useState } from 'react';
import {
  Globe2,
  MapPin,
  Users,
  Activity,
  Flame,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { GeoMapData } from '../../../../lib/sheet2DataService';

interface Props {
  data: GeoMapData;
}

export default function GeoMapProfileView({ data }: Props) {
  const { totalCountries, topCountry, topCity, locations } = data;
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  // Projected SVG coordinates for world map markers
  const cityPinCoordinates: Record<string, { cx: number; cy: number }> = {
    US: { cx: 200, cy: 155 }, // San Francisco
    GB: { cx: 480, cy: 120 }, // London
    DE: { cx: 515, cy: 115 }, // Frankfurt
    SG: { cx: 740, cy: 260 }, // Singapore
    CA: { cx: 260, cy: 130 }, // Toronto
    AU: { cx: 840, cy: 340 }, // Sydney
    JP: { cx: 810, cy: 160 }, // Tokyo
    NL: { cx: 495, cy: 112 }  // Amsterdam
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Countries Reached</span>
            <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-400">
              <Globe2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{totalCountries}</div>
          <span className="text-xs text-slate-400">Active telemetry clusters</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Top Geographic Market</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{topCountry}</div>
          <span className="text-xs text-emerald-400 font-bold">58.4% of high-intent traffic</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Top Urban Hub</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">{topCity}</div>
          <span className="text-xs text-slate-400">Silicon Valley enterprise density</span>
        </div>
      </div>

      {/* 2. Interactive SVG Vector Map & Selected Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vector Map */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-white">Interactive Global Density Map</h4>
              <p className="text-xs text-slate-400">Click any density cluster to inspect regional engagement</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Raw IP Exposure</span>
            </div>
          </div>

          {/* Stylized SVG World Map Visualization */}
          <div className="relative w-full h-80 bg-slate-950/80 rounded-xl border border-slate-800/80 p-2 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 1000 450" className="w-full h-full opacity-60">
              {/* World outline paths */}
              <path
                d="M150,110 Q220,90 280,120 T320,180 T260,240 T180,210 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              <path
                d="M240,240 Q290,260 300,320 T260,400 T210,340 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              <path
                d="M460,90 Q540,80 580,130 T520,190 T450,150 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              <path
                d="M470,190 Q560,200 580,280 T510,370 T440,270 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              <path
                d="M600,90 Q780,70 880,120 T840,230 T680,200 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              <path
                d="M750,290 Q850,270 890,340 T820,410 T720,360 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
            </svg>

            {/* Interactive Location Nodes */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 1000 450" className="w-full h-full">
                {locations.map((loc) => {
                  const coords = cityPinCoordinates[loc.id] || { cx: 500, cy: 220 };
                  const isSelected = selectedLocation.id === loc.id;
                  const radius = Math.max(5, Math.min(14, Math.round(loc.visitorCount / 1400)));
                  return (
                    <g
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className="cursor-pointer group"
                    >
                      {/* Pulse circle */}
                      <circle
                        cx={coords.cx}
                        cy={coords.cy}
                        r={radius + 6}
                        fill={isSelected ? '#3b82f6' : '#6366f1'}
                        opacity={isSelected ? 0.35 : 0.15}
                        className="animate-ping"
                      />
                      {/* Base circle */}
                      <circle
                        cx={coords.cx}
                        cy={coords.cy}
                        r={radius}
                        fill={isSelected ? '#3b82f6' : '#4f46e5'}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        className="transition-all group-hover:scale-125"
                      />
                      {/* City label */}
                      <text
                        x={coords.cx}
                        y={coords.cy - radius - 4}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : '#94a3b8'}
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {loc.city}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Selected Location Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Selected Geo Territory</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-1">
              {selectedLocation.city}, {selectedLocation.country}
            </h4>
            <p className="text-xs text-slate-400 mb-6">{selectedLocation.region}</p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Total Visitors:</span>
                <span className="text-white font-bold">{selectedLocation.visitorCount.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Sessions Logged:</span>
                <span className="text-emerald-400 font-bold">{selectedLocation.sessions.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Engagement Score:</span>
                <span className="text-emerald-400 font-bold">{selectedLocation.engagementScore}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">High-Intent Leads:</span>
                <span className="text-rose-400 font-bold">{selectedLocation.leads}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            Privacy Filter: Aggregated regional telemetry without individual PII or raw IP addresses.
          </div>
        </div>
      </div>

      {/* 3. Geographic Distribution Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Geographic Distribution Ledger</h4>
            <p className="text-xs text-slate-400">Ranked by volume of verified unique visitors and lead conversions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="pb-3 font-semibold">Country</th>
                <th className="pb-3 font-semibold">Region</th>
                <th className="pb-3 font-semibold">City Cluster</th>
                <th className="pb-3 font-semibold">Visitors</th>
                <th className="pb-3 font-semibold">Sessions</th>
                <th className="pb-3 font-semibold">Score</th>
                <th className="pb-3 font-semibold text-right">Qualified Leads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {locations.map((loc) => (
                <tr
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`cursor-pointer transition-colors ${
                    selectedLocation.id === loc.id ? 'bg-[#2878B5]/10' : 'hover:bg-slate-800/30'
                  }`}
                >
                  <td className="py-3 font-bold text-white">{loc.country}</td>
                  <td className="py-3 text-slate-400">{loc.region}</td>
                  <td className="py-3 text-emerald-400">{loc.city}</td>
                  <td className="py-3 text-slate-200">{loc.visitorCount.toLocaleString()}</td>
                  <td className="py-3 text-slate-300">{loc.sessions.toLocaleString()}</td>
                  <td className="py-3 text-emerald-400 font-bold">{loc.engagementScore}/100</td>
                  <td className="py-3 text-right text-rose-400 font-bold">{loc.leads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
