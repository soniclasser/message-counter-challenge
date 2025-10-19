import { Request, Response } from 'express';

export const mockDailyTotal = (req: Request, res: Response) => {
    const payload = req.body;
    
    console.log(`[Mock] 🚨 EVENTO RECIBIDO (Total Diario): Cuenta ${payload.account_id} - Total: ${payload.total_messages_today}`);

    return res.status(200).send({ status: 'Daily total received successfully' });
};