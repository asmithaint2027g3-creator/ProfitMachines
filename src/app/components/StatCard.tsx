import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  suffix?: string;
  subtext?: string;
  index: number;
}

export default function StatCard({ label, value, suffix, subtext, index }: StatCardProps) {
  return (
    <div
      className="relative group p-4 md:p-5 rounded-2xl bg-white border border-[#0066FF] hover:shadow-xl hover:border-[#0066FF] transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/0 via-blue-50/0 to-[#0066FF]/0 group-hover:from-[#0066FF]/50 group-hover:to-[#0066FF]/50 transition-all duration-500"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-baseline justify-center gap-2 mb-1 flex-wrap">
          <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
            {value}
          </div>
          {suffix && (
            <div className="text-[10px] text-[#0066FF] font-medium uppercase tracking-wider relative -top-1">
              {suffix}
            </div>
          )}
        </div>
        <div className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-1">
          {label}
        </div>
        {subtext && (
          <div className="text-xs text-[#0066FF] font-medium">
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
