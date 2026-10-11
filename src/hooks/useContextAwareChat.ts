import { useEffect, useRef } from 'react';


export interface ContextTrigger {
    id: string; // The ID of the section/block
    name: string; // Readable name for the user
    triggerCount: number; // To track if we've already triggered for this session
}

// Global state to avoid re-triggering the same context multiple times per session
const triggeredContexts = new Set<string>();

export const useContextAwareChat = () => {
    // Automatic popping up of the chat was disabled per user feedback
    // so users can interact with the mobile and desktop views without constant popups.
    return;
};
