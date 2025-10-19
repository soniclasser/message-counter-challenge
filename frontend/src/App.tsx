// /frontend/src/App.tsx

import React from 'react';
import { CountQueryForm } from './components/CountQueryForm';
import { ResultsTable } from './components/ResultsTable';

const App: React.FC = () => {
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-6xl">
            <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">Staff Engineer Challenge: Contador de Mensajes</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <CountQueryForm />
                </div>
                    <div className="lg:col-span-2">
                    <ResultsTable />
                </div>
            </div>
        </div>
    );
};

export default App;