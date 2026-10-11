import React from 'react';

interface EngineTabProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

export default function EngineTab({ title, isActive, onClick }: EngineTabProps) {
    return (
        <button
            onClick={onClick}
            className={`
        relative px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 w-full text-left flex items-center justify-between group
        ${isActive
                    ? 'text-white shadow-lg shadow-blue-900/10 scale-[1.02]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm'
                }
      `}
        >
            <span className={`relative z-10 group-hover:text-[#064e3b] transition-colors ${isActive ? 'text-white group-hover:text-white' : ''}`}>{title}</span>

            {/* Active Indicator or Chevron */}
            <div className={`transition-transform duration-300 ${isActive ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isActive ? 'text-white' : 'text-slate-400'}>
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {isActive && (
                <div className="absolute inset-0 bg-[#064e3b] rounded-xl -z-10">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] to-emerald-600 rounded-xl opacity-100 shadow-inner"></div>
                </div>
            )}
        </button>
    );
}
