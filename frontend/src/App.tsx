// /frontend/src/App.tsx

import React, { useEffect, useState } from 'react';
import { CountQueryForm } from './components/CountQueryForm';
import { ResultsTable } from './components/ResultsTable';
import { socket } from './socket';

interface MockEventPayload {
    account_id: string;
    total_messages_today: number;
}

const App: React.FC = () => {
    const [latestMockEvent, setLatestMockEvent] = useState<MockEventPayload | null>(null);

    useEffect(() => {
        socket.on('mockEvent', (payload: MockEventPayload) => {
            console.log('Received mockEvent:', payload);
            setLatestMockEvent(payload);
        });

        return () => {
            socket.off('mockEvent');
        };
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-6xl">
            <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">Staff Engineer Challenge: Contador de Mensajes</h1>
            
            {latestMockEvent && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Evento Mock Recibido en Tiempo Real:</p>
                    <p>Account ID: {latestMockEvent.account_id}</p>
                    <p>Total Mensajes Hoy: {latestMockEvent.total_messages_today}</p>
                </div>
            )}

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
