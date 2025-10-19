import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { SocketService } from '../services/SocketService';

@injectable()
export class MockController {
  constructor(@inject(SocketService) private socketService: SocketService) {}

  public mockDailyTotal = (req: Request, res: Response) => {
    const payload = req.body;

    console.log(`[Mock] 🚨 EVENTO RECIBIDO (Total Diario): Cuenta ${payload.account_id} - Total: ${payload.total_messages_today}`);
    this.socketService.emitMockEvent(payload);

    return res.status(200).send({ status: 'Daily total received successfully' });
  };
}
