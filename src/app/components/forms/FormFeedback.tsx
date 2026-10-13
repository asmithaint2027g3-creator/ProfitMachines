import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export interface FormSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    submissionId: string;
    email: string;
    title?: string;
    message?: string;
}

export const FormSuccessModal: React.FC<FormSuccessModalProps> = ({
    isOpen,
    onClose,
    submissionId,
    email,
    title = "Consultation Registered",
    message = "Your strategic request has been securely logged. Our executive consulting team will review your architecture and contact you within 1 business day."
}) => {
    const [copied, setCopied] = React.useState(false);

    if (!isOpen) return null;

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(submissionId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-white rounded-2xl border-2 border-[#0066FF] p-6 sm:p-8 text-[#0066FF] relative">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#0066FF] flex items-center justify-center text-[#0066FF] mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-center text-[#0066FF] mb-2 font-heading">
                    {title}
                </h3>

                <p className="text-sm text-[#0066FF] text-center mb-6 leading-relaxed font-medium">
                    {message}
                </p>

                <div className="p-4 rounded-xl bg-white border border-[#0066FF] mb-6">
                    <div className="flex items-center justify-between text-xs text-[#0066FF] mb-1 font-bold">
                        <span>Official Reference ID:</span>
                        <span className="font-mono text-[#0066FF]">Priority Logged</span>
                    </div>
                    <div className="flex items-center justify-between font-mono font-bold text-[#0066FF] text-sm">
                        <span>{submissionId}</span>
                        <button
                            onClick={copyToClipboard}
                            className="inline-flex items-center gap-1 text-xs text-[#0066FF] font-semibold py-1 px-2 rounded border border-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-colors"
                        >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copied ? 'Copied' : 'Copy'}</span>
                        </button>
                    </div>
                    {email && (
                        <div className="mt-2 pt-2 border-t border-[#0066FF]/40 text-xs text-[#0066FF]">
                            Confirmation logged for <span className="font-bold">{email}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#0066FF] mb-6 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                    <span>SOC2 Type II & GDPR Compliant Ingestion</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
                    <Link
                        to="/solutions"
                        onClick={onClose}
                        className="flex-1 py-2.5 px-3 rounded-lg border-2 border-[#0066FF] bg-white hover:bg-[#0066FF] hover:text-white text-[#0066FF] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                        <span>Explore Solutions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold text-xs transition-all"
                    >
                        Done & Return
                    </button>
                </div>
            </div>
        </div>
    );
};

export const validateBusinessEmail = (email: string, enforceBusiness: boolean = true): { valid: boolean; message?: string } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
        return { valid: false, message: "Please provide a valid work email address." };
    }

    if (enforceBusiness) {
        const domain = email.split('@')[1]?.toLowerCase().trim();
        const personalDomains = [
            'gmail.com',
            'googlemail.com',
            'yahoo.com',
            'ymail.com',
            'rocketmail.com',
            'hotmail.com',
            'outlook.com',
            'live.com',
            'msn.com',
            'aol.com',
            'icloud.com',
            'me.com',
            'mac.com',
            'mail.ru',
            'yandex.com',
            'yandex.ru',
            'protonmail.com',
            'proton.me',
            'zoho.com',
            'gmx.com',
            'gmx.net',
            'mail.com'
        ];
        if (domain && personalDomains.includes(domain)) {
            return { valid: false, message: "Please use your official company / business email address (e.g. name@company.com). Personal email domains (Gmail, Yahoo, Outlook, etc.) are not accepted." };
        }
    }

    return { valid: true };
};

export const validatePhone = (phone: string): { valid: boolean; message?: string } => {
    const digits = (phone || '').replace(/[^\d]/g, '');
    if (!phone || digits.length < 7 || digits.length > 15) {
        return { valid: false, message: "Please enter a valid phone number." };
    }
    return { valid: true };
};

export const HoneypotField: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 0, width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="website_url">Leave this field empty</label>
        <input
            type="text"
            id="website_url"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export interface FormErrorBannerProps {
    message?: string | null;
    error?: string | null;
    onDismiss?: () => void;
}

export const FormErrorBanner: React.FC<FormErrorBannerProps> = ({ message, error, onDismiss }) => {
    const text = message || error;
    if (!text) return null;
    return (
        <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-[#0066FF] text-[#0066FF] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#0066FF]" />
            <div className="flex-1">
                <p className="font-bold leading-relaxed">{text}</p>
            </div>
            {onDismiss && (
                <button type="button" onClick={onDismiss} aria-label="Dismiss error" className="text-[#0066FF] hover:bg-[#0066FF]/10 p-1 rounded">
                    ✕
                </button>
            )}
        </div>
    );
};
