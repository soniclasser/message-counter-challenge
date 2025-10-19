import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ProcessedMessageRepository } from '../repositories/ProcessedMessageRepository';
import { RabbitMQService } from '../services/RabbitMQService';
import { TransactionService } from '../services/TransactionService';

@injectable()
export class WebhookController {
  constructor(
    private readonly processedMessageRepository: ProcessedMessageRepository,
    private readonly rabbitMQService: RabbitMQService,
    private readonly transactionService: TransactionService
  ) {}

  public handleWebhook = async (req: Request, res: Response) => {
    const { message_id, account_id, created_at } = req.body;

    if (!message_id || !account_id || !created_at) {
      return res.status(400).send({ error: 'Faltan campos obligatorios: message_id, account_id o created_at.' });
    }

    try {
      await this.transactionService.transaction(async (transaction) => {
        await this.processedMessageRepository.create({ message_id, account_id }, { transaction });
        this.rabbitMQService.publish(req.body);
      });

      return res.status(202).send({
        status: 'Processing accepted',
        message: 'Mensaje publicado con éxito en la cola para procesamiento asíncrono.'
      });

    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        console.warn(`[Webhook] Mensaje duplicado recibido (ID: ${message_id}). Descartado.`);
        return res.status(202).send({ status: 'Already processed', message: 'El ID del mensaje ya fue registrado.' });
      }

      console.error(`[Webhook] Error interno en el procesamiento para ID: ${message_id}`, error);
      return res.status(500).send({ error: 'Error interno del servidor durante el procesamiento.' });
    }
  };
}
