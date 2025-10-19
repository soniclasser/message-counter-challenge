import { Router } from 'express';
import { handleWebhook } from '../controllers/WebhookController'; 
import { getCounts } from '../controllers/CountQueryController'; 
import { mockDailyTotal } from '../controllers/MockController'; 
import { RabbitMQService } from '../services/RabbitMQService';

export const createRouter = (rabbitMQService: RabbitMQService) => {
  const router = Router();

  router.post('/webhook/message', handleWebhook(rabbitMQService));

  router.get('/counts', getCounts);

  router.post('/mock/daily-total', mockDailyTotal);

  return router;
};