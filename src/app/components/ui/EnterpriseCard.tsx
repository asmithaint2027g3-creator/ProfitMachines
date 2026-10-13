import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../lib/analytics';

// 1. CAPABILITY CARD
export interface CapabilityCardProps {
    icon?: React.ReactNode;
    category?: string;
    title: string;
    description: string;
    keyOutcome?: string;
    link?: string;
    badge?: string;
    className?: string;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({
    icon,
    category,
    title,
    description,
    keyOutcome,
    link,
    badge,
    className = ''
}) => {
    const CardWrapper = ({ children }: { children: React.ReactNode }) => {
        if (link) {
            return (
                <Link
                    to={link}
                    onClick={() => trackEvent({ eventName: 'CAPABILITY_CARD_CLICK', label: title })}
                    className="block h-full group focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-2xl"
                >
                    {children}
                </Link>
            );
        }
        return <div className="h-full group">{children}</div>;
    };

    return (
        <CardWrapper>
            <div className={`h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#0066FF]/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/5 hover:border-[#0066FF] hover:-translate-y-1 relative overflow-hidden ${className}`}>
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                    <div className="flex items-center justify-between mb-4">
                        {icon && (
                            <div className="w-12 h-12 rounded-xl bg-white border border-[#0066FF] flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                                {icon}
                            </div>
                        )}
                        {badge && (
                            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-[#0066FF] border border-[#0066FF]">
                                {badge}
                            </span>
                        )}
                        {category && !badge && (
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF]">
                                {category}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-[#0066FF] group-hover:text-[#0066FF] transition-colors mb-2.5 leading-snug">
                        {title}
                    </h3>

                    <p className="text-sm text-[#0066FF] leading-relaxed mb-4">
                        {description}
                    </p>
                </div>

                <div>
                    {keyOutcome && (
                        <div className="pt-3 border-t border-[#0066FF] mb-4 flex items-center gap-2 text-xs font-semibold text-[#0066FF] bg-white/70 px-3 py-1.5 rounded-lg">
                            <TrendingUp className="w-3.5 h-3.5 shrink-0 text-[#0066FF]" />
                            <span className="truncate">{keyOutcome}</span>
                        </div>
                    )}

                    {link && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] group-hover:text-[#0066FF] group-hover:translate-x-1 transition-all">
                            <span>Explore Solution</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    )}
                </div>
            </div>
        </CardWrapper>
    );
};

// 2. OFFERING CARD
export interface OfferingCardProps {
    title: string;
    subtitle?: string;
    problemSolved: string;
    solution: string;
    outcome: string;
    ctaLink: string;
    ctaText?: string;
    icon?: React.ReactNode;
}

export const OfferingCard: React.FC<OfferingCardProps> = ({
    title,
    subtitle,
    problemSolved,
    solution,
    outcome,
    ctaLink,
    ctaText = 'View Capabilities',
    icon
}) => {
    return (
        <div className="flex flex-col justify-between p-7 rounded-2xl bg-white border border-[#0066FF]/90 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:border-[#0066FF] transition-all duration-300">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    {icon && (
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#0066FF] flex items-center justify-center text-[#0066FF]">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h3 className="text-lg font-bold text-[#0066FF] leading-tight">{title}</h3>
                        {subtitle && <p className="text-xs text-[#0066FF] font-medium">{subtitle}</p>}
                    </div>
                </div>

                <div className="space-y-3 mb-6 text-xs">
                    <div className="p-3 rounded-lg bg-red-50/60 border border-red-100 text-[#0066FF]">
                        <span className="font-bold text-red-700 block mb-0.5">Problem Addressed:</span>
                        {problemSolved}
                    </div>
                    <div className="p-3 rounded-lg bg-white/60 border border-[#0066FF] text-[#0066FF]">
                        <span className="font-bold text-[#0066FF] block mb-0.5">AI Engine Architecture:</span>
                        {solution}
                    </div>
                    <div className="p-3 rounded-lg bg-white/60 border border-[#0066FF] text-[#0066FF]">
                        <span className="font-bold text-[#0066FF] block mb-0.5">Verified Outcome:</span>
                        {outcome}
                    </div>
                </div>
            </div>

            <Link
                to={ctaLink}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[#0066FF] text-white text-xs font-bold transition-all shadow-sm group"
            >
                <span>{ctaText}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
        </div>
    );
};

// 3. METRIC CARD
export interface MetricCardProps {
    metric: string;
    label: string;
    context?: string;
    icon?: React.ReactNode;
    trend?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    metric,
    label,
    context,
    icon,
    trend
}) => {
    return (
        <div className="p-6 rounded-2xl bg-white border border-[#0066FF]/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0066FF] font-mono tracking-tight text-gradient">
                    {metric}
                </span>
                {icon && (
                    <div className="w-9 h-9 rounded-lg bg-white text-[#0066FF] flex items-center justify-center">
                        {icon}
                    </div>
                )}
            </div>

            <div className="text-sm font-bold text-[#0066FF] mb-1">{label}</div>
            {context && <p className="text-xs text-[#0066FF] leading-relaxed">{context}</p>}
            {trend && (
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#0066FF]">
                    <TrendingUp className="w-3 h-3" />
                    <span>{trend}</span>
                </div>
            )}
        </div>
    );
};

// 4. PROCESS STEP CARD
export interface ProcessStepCardProps {
    stepNumber: string | number;
    title: string;
    description: string;
    keyDeliverable?: string;
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
    stepNumber,
    title,
    description,
    keyDeliverable
}) => {
    return (
        <div className="relative p-6 sm:p-7 rounded-2xl bg-white border border-[#0066FF] shadow-sm hover:border-[#0066FF] hover:shadow-md transition-all">
            <div className="w-9 h-9 rounded-xl bg-white text-white font-mono text-xs font-bold flex items-center justify-center mb-4 shadow-sm">
                {String(stepNumber).padStart(2, '0')}
            </div>

            <h4 className="text-lg font-bold text-[#0066FF] mb-2">{title}</h4>
            <p className="text-sm text-[#0066FF] leading-relaxed mb-4">{description}</p>

            {keyDeliverable && (
                <div className="pt-3 border-t border-[#0066FF] flex items-center gap-2 text-xs font-medium text-[#0066FF]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    <span>{keyDeliverable}</span>
                </div>
            )}
        </div>
    );
};
