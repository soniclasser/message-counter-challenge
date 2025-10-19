// /frontend/src/store/countStore.ts

import { create } from 'zustand';
import axios from 'axios';

interface HourlyCount {
    account_id: string;
    datetime: string;
    count_messages: number;
}

interface CountState {
    results: HourlyCount[];
    loading: boolean;
    error: string | null;
    
    fetchCounts: (accountId: string, fromDate: string, toDate: string) => Promise<void>;
}

export const useCountStore = create<CountState>((set) => ({
    results: [],
    loading: false,
    error: null,
    
    fetchCounts: async (accountId, fromDate, toDate) => {
        set({ loading: true, error: null, results: [] });

        if (!accountId || !fromDate || !toDate) {
            set({ error: 'Todos los campos son obligatorios.', loading: false });
            return;
        }

        try {
            const response = await axios.get<HourlyCount[]>('/api/v1/counts', {
                params: {
                    account_id: accountId,
                    from: new Date(fromDate).toISOString(),
                    to: new Date(toDate).toISOString(),
                }
            });
            
            set({ results: response.data, loading: false });

        } catch (err) {
            console.error("Error al obtener datos:", err);
            set({ 
                error: 'Error al obtener datos. Verifique que el servidor de la API esté corriendo y los logs del backend.', 
                loading: false 
            });
        }
    },
}));