import React from 'react';
import { useCountStore } from '../store/countStore';

export const ResultsTable: React.FC = () => {
    const { results, loading, error } = useCountStore(state => ({
        results: state.results,
        loading: state.loading,
        error: state.error,
    }));

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 bg-white shadow-xl rounded-2xl text-indigo-600 font-semibold text-lg">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando resultados...
            </div>
        );
    }

    if (error) {
        return <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-2xl shadow-xl font-medium text-center">{error}</div>;
    }

    if (results.length === 0) {
        return <div className="p-6 text-gray-600 bg-gray-50 rounded-2xl shadow-xl font-medium text-center">No hay datos disponibles o aún no se ha realizado la consulta.</div>;
    }

    return (
        <div className="shadow-xl rounded-2xl overflow-hidden bg-white">
            <h2 className="text-2xl font-bold p-6 border-b border-gray-200 text-gray-800">Resultados de la Consulta ({results.length} registros)</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Account ID</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Datetime (UTC)</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Messages</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {results.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.account_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(item.datetime).toUTCString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{item.count_messages}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};