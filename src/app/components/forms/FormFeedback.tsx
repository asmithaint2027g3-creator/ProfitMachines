import React from 'react';
import { CheckCircle2, AlertCircle, Copy, Check, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-slate-900 relative">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-5 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-center text-slate-900 mb-2">
                    {title}
                </h3>

                <p className="text-sm text-slate-600 text-center mb-6 leading-relaxed">
                    {message}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Official Reference ID:</span>
                        <span className="font-mono text-emerald-700 font-semibold">Priority Logged</span>
                    </div>
                    <div className="flex items-center justify-between font-mono font-bold text-slate-900 text-sm">
                        <span>{submissionId}</span>
                        <button
                            onClick={copyToClipboard}
                            className="inline-flex items-center gap-1 text-xs text-[#064e3b] hover:text-[#042d22] font-sans font-semibold py-1 px-2 rounded-md hover:bg-emerald-50 transition-colors"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copied ? 'Copied' : 'Copy'}</span>
                        </button>
                    </div>
                    {email && (
                        <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                            Confirmation logged for <span className="font-semibold text-slate-800">{email}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>SOC2 Type II & GDPR Compliant Ingestion</span>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
                >
                    Done & Return to Platform
                </button>
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

/**
 * Invisible honeypot field — bots tend to auto-fill every input, humans never see or touch it.
 * Wire `value`/`onChange` into a piece of state and drop the submission silently if it's non-empty.
 */
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
        <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="font-semibold leading-relaxed">{text}</p>
            </div>
            {onDismiss && (
                <button type="button" onClick={onDismiss} aria-label="Dismiss error" className="text-red-400 hover:text-red-700 transition-colors">
                    <Check className="w-4 h-4 rotate-45" />
                </button>
            )}
        </div>
    );
};
