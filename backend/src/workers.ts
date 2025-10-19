// /backend/src/workers.ts (o el nombre de tu archivo principal del Worker)

import * as dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/config';
import { RabbitMQService } from './services/RabbitMQService';
import { WorkerService } from './services/WorkerService'; 


const rabbitMQService = new RabbitMQService();
const workerService = new WorkerService(rabbitMQService);

const startWorker = async () => {
  await connectDB();
  await rabbitMQService.connect();
  await workerService.consumeMessages(); 

  console.log('[Worker] Servicio de consumo iniciado. Esperando eventos...');
};

startWorker().catch(err => {
  console.error('Error al iniciar el servicio Worker:', err);
  process.exit(1); 
});