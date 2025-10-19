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
            <div className="text-center p-8 text-indigo-600 font-medium bg-white shadow-lg rounded-xl">
                Cargando resultados...
            </div>
        );
    }

    if (error) {
        return <p className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">{error}</p>;
    }

    if (results.length === 0) {
        return <p className="p-4 text-gray-500 bg-gray-100 rounded-lg shadow-md">No hay datos disponibles o aún no se ha realizado la consulta.</p>;
    }

    return (
        <div className="shadow-lg rounded-xl overflow-hidden bg-white">
            <h2 className="text-xl font-semibold p-4 border-b text-gray-700">Resultados de la Consulta ({results.length} registros)</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datetime (UTC)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Messages</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {results.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition duration-100'}>
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