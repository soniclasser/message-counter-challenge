import { injectable } from 'tsyringe';
import { Op } from 'sequelize';
import * as amqp from 'amqplib/callback_api';
import { Channel } from 'amqplib';
import { RabbitMQService } from './RabbitMQService';
import { HourlyCountRepository } from '../repositories/HourlyCountRepository';
import { NotificationService } from './NotificationService';

const getRoundedHour = (dateString: string): Date => {
  const date = new Date(dateString);
  date.setMinutes(0, 0, 0);
  return date;
};

@injectable()
export class WorkerService {
    private channel: amqp.Channel | null = null;
    private readonly queueName = 'message.processing.queue';

    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly hourlyCountRepository: HourlyCountRepository,
        private readonly notificationService: NotificationService
    ) {}

    public async consumeMessages() {
        this.channel = this.rabbitMQService.getChannel();
        console.log(`[Worker] Escuchando mensajes en la cola: ${this.queueName}`);
        ((this.channel as unknown) as Channel).consume(this.queueName, (msg: amqp.ConsumeMessage | null) => {
            if (!msg) return;

            this.handleMessage(msg).catch(error => {
                console.error("[Worker] Error crítico al manejar mensaje, rechazado (nack):", error);
                this.channel!.nack(msg);
            });

        }, {
            noAck: false
        });
    }

    private async handleMessage(msg: amqp.ConsumeMessage): Promise<void> {
        try {
            const payload = JSON.parse(msg.content.toString());
            const { account_id, created_at } = payload;

            const rounded_hour = getRoundedHour(created_at);
            const today = rounded_hour.toISOString().slice(0, 10);

            const [hourlyRecord, created] = await this.hourlyCountRepository.findOrCreate(
                { account_id, rounded_hour },
                { message_count: 1 }
            );

            if (!created) {
                await this.hourlyCountRepository.increment(hourlyRecord, 'message_count', { by: 1 });
            }

            const startOfDay = new Date(today);
            const endOfDay = new Date(startOfDay);
            endOfDay.setDate(startOfDay.getDate() + 1);

            const dailyTotalResult = await this.hourlyCountRepository.sum('message_count', {
                where: {
                    account_id,
                    rounded_hour: {
                        [Op.gte]: startOfDay,
                        [Op.lt]: endOfDay,
                    }
                }
            });

            const dailyTotalPayload = {
                event_type: 'DAILY_MESSAGE_TOTAL',
                account_id: account_id,
                date: today,
                total_messages_today: dailyTotalResult || 0
            };

            await this.notificationService.sendDailyTotal(dailyTotalPayload);

            this.channel!.ack(msg);
            console.log(`[Worker] Mensaje procesado exitosamente para ID: ${account_id}, Hora: ${rounded_hour.toISOString()}`);

        } catch (error) {
            console.error("[Worker] Error al procesar el mensaje, se rechazará (nack):", error);
            throw error;
        }
    }
}
