import { Router } from 'express';
import { container } from 'tsyringe';
import { WebhookController } from '../controllers/WebhookController';
import { CountQueryController } from '../controllers/CountQueryController';
import { MockController } from '../controllers/MockController';

export const createRouter = () => {
  const router = Router();

  const webhookController = container.resolve(WebhookController);
  const countQueryController = container.resolve(CountQueryController);
  const mockController = container.resolve(MockController);

  router.post('/webhook/message', webhookController.handleWebhook);
  router.get('/counts', countQueryController.getCounts);
  router.post('/mock/daily-total', mockController.mockDailyTotal);

  return router;
};