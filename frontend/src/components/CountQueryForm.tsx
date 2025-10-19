// /frontend/src/components/CountQueryForm.tsx

import React, { useState } from 'react';
import { useCountStore } from '../store/countStore';

const formatDateToInput = (date: Date): string => {
    return date.toISOString().slice(0, 16);
}

export const CountQueryForm: React.FC = () => {
    // Conecta a Zustand
    const fetchCounts = useCountStore(state => state.fetchCounts);
    const loading = useCountStore(state => state.loading);

    const defaultDate = formatDateToInput(new Date());
    
    const [accountId, setAccountId] = useState('acc_123');
    const [fromDate, setFromDate] = useState(defaultDate);
    const [toDate, setToDate] = useState(defaultDate);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchCounts(accountId, fromDate, toDate);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white sticky top-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Consulta de Conteo Horario</h2>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Account ID</label>
                <input
                    type="text"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    required
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Desde (Hora UTC)</label>
                <input
                    type="datetime-local"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    required
                />
            </div>
             <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">Hasta (Hora UTC)</label>
                <input
                    type="datetime-local"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400"
                disabled={loading}
            >
                {loading ? 'Consultando...' : 'Consultar'}
            </button>
        </form>
    );
};