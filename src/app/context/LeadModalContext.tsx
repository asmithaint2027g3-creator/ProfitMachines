import React, { createContext, useContext, useState, useCallback } from 'react';

export type LeadModalType = 'quick' | 'long' | null;

export interface LeadModalOptions {
    defaultService?: string;
    service?: string;
    defaultIndustry?: string;
    industry?: string;
    source?: string;
    title?: string;
}

interface LeadModalContextType {
    isOpen: boolean;
    modalType: LeadModalType;
    modalOptions: LeadModalOptions;
    openQuickForm: (options?: LeadModalOptions | string) => void;
    openLongForm: (options?: LeadModalOptions | string) => void;
    closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export const LeadModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<LeadModalType>(null);
    const [modalOptions, setModalOptions] = useState<LeadModalOptions>({});

    const openQuickForm = useCallback((options?: LeadModalOptions | string) => {
        const normalized = typeof options === 'string' ? { defaultService: options, service: options } : (options || {});
        setModalOptions(normalized);
        setModalType('quick');
        setIsOpen(true);
    }, []);

    const openLongForm = useCallback((options?: LeadModalOptions | string) => {
        const normalized = typeof options === 'string' ? { defaultService: options, service: options } : (options || {});
        setModalOptions(normalized);
        setModalType('long');
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalType(null);
        setModalOptions({});
    }, []);

    return (
        <LeadModalContext.Provider
            value={{
                isOpen,
                modalType,
                modalOptions,
                openQuickForm,
                openLongForm,
                closeModal
            }}
        >
            {children}
        </LeadModalContext.Provider>
    );
};

export const useLeadModal = () => {
    const context = useContext(LeadModalContext);
    if (!context) {
        throw new Error('useLeadModal must be used within a LeadModalProvider');
    }
    return context;
};
