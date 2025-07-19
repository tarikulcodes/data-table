import { VisibilityState } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';

export function useColumnVisibility(tableKey: string, defaultVisibility: VisibilityState = {}) {
    const storageKey = `datatable-column-visibility-${tableKey}`;

    // Initialize state from localStorage or use default
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
        if (typeof window === 'undefined') return defaultVisibility;

        try {
            const stored = localStorage.getItem(storageKey);
            return stored ? JSON.parse(stored) : defaultVisibility;
        } catch {
            return defaultVisibility;
        }
    });

    // Save to localStorage whenever visibility changes
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(storageKey, JSON.stringify(columnVisibility));
        } catch (error) {
            console.warn('Failed to save column visibility to localStorage:', error);
        }
    }, [columnVisibility, storageKey]);

    // Function to update visibility and save to localStorage
    const updateColumnVisibility = useCallback((updater: VisibilityState | ((old: VisibilityState) => VisibilityState)) => {
        setColumnVisibility(updater);
    }, []);

    // Function to reset to default visibility
    const resetColumnVisibility = useCallback(() => {
        setColumnVisibility(defaultVisibility);
    }, [defaultVisibility]);

    return {
        columnVisibility,
        setColumnVisibility: updateColumnVisibility,
        resetColumnVisibility,
    };
}
