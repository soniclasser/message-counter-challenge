import React, { useState } from 'react';
import { useCountStore } from '../store/countStore';

const formatDateToInput = (date: Date): string => {
    return date.toISOString().slice(0, 16);
}

export const CountQueryForm: React.FC = () => {
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
        <form onSubmit={handleSubmit} className="p-8 border border-neutral-200 rounded-2xl shadow-xl bg-white transition-all duration-300 hover:shadow-2xl sticky top-4">
            <h2 className="text-3xl font-bold mb-8 text-neutral-800 text-center">Consulta de Conteo Horario</h2>
            
            <div className="mb-5">
                <label htmlFor="accountId" className="block text-sm font-medium text-neutral-700 mb-2">Account ID</label>
                <input
                    type="text"
                    id="accountId"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-200 text-neutral-800"
                    required
                />
            </div>
            
            <div className="mb-5">
                <label htmlFor="fromDate" className="block text-sm font-medium text-neutral-700 mb-2">Desde (Hora UTC)</label>
                <input
                    type="datetime-local"
                    id="fromDate"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-200 text-neutral-800"
                    required
                />
            </div>
             <div className="mb-7">
                <label htmlFor="toDate" className="block text-sm font-medium text-neutral-700 mb-2">Hasta (Hora UTC)</label>
                <input
                    type="datetime-local"
                    id="toDate"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-200 text-neutral-800"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-primary-600 text-white font-bold p-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? 'Consultando...' : 'Consultar'}
            </button>
        </form>
    );
};