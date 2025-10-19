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
        <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full space-y-8">
                <h1 className="text-5xl font-extrabold text-center text-neutral-900 tracking-tight leading-tight">
                    Staff Engineer Challenge: Contador de Mensajes
                </h1>
                
                {latestMockEvent && (
                    <div className="flex items-center bg-primary-50 border-l-4 border-primary-400 text-primary-800 p-4 rounded-lg shadow-md transition-all duration-500 ease-in-out transform hover:scale-105" role="alert">
                        <svg className="h-6 w-6 text-primary-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="font-bold text-lg">¡Evento Mock Recibido en Tiempo Real!</p>
                            <p className="text-sm">Account ID: <span className="font-semibold">{latestMockEvent.account_id}</span></p>
                            <p className="text-sm">Total Mensajes Hoy: <span className="font-semibold">{latestMockEvent.total_messages_today}</span></p>
                        </div>
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
        </div>
    );
};

export default App;
