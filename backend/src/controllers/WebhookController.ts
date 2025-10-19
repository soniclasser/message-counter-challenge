import { Request, Response } from 'express';
import { ProcessedMessage } from '../models/ProcessedMessage';
import { RabbitMQService } from '../services/RabbitMQService'; 
import sequelize from '../config/config';
import { Transaction } from 'sequelize';

export const handleWebhook = (rabbitMQService: RabbitMQService) => async (req: Request, res: Response) => {
  const { message_id, account_id, created_at } = req.body;
  
  if (!message_id || !account_id || !created_at) {
    return res.status(400).send({ error: 'Faltan campos obligatorios: message_id, account_id o created_at.' });
  }

  let transaction: Transaction | undefined;
  try {
    transaction = await sequelize.transaction();
    await ProcessedMessage.create({ message_id, account_id }, { transaction });
    rabbitMQService.publish(req.body); 
    
    await transaction.commit();
    
    return res.status(202).send({ 
      status: 'Processing accepted',
      message: 'Mensaje publicado con éxito en la cola para procesamiento asíncrono.'
    });

  } catch (error: any) {
    if (transaction) await transaction.rollback();

    if (error.name === 'SequelizeUniqueConstraintError') {
      console.warn(`[Webhook] Mensaje duplicado recibido (ID: ${message_id}). Descartado.`);
      return res.status(202).send({ status: 'Already processed', message: 'El ID del mensaje ya fue registrado.' });
    }

    console.error(`[Webhook] Error interno en el procesamiento para ID: ${message_id}`, error);
    return res.status(500).send({ error: 'Error interno del servidor durante el procesamiento.' });
  }
};