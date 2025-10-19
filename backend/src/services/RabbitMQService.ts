
import * as amqp from 'amqplib/callback_api';

export class RabbitMQService {

    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;

    private readonly queueName = 'message.processing.queue';
    private readonly rabbitmqUrl: string;
    
    constructor() {
        if (!process.env.RABBITMQ_URL) {
            throw new Error('RABBITMQ_URL no está definido en el entorno.');
        }
        this.rabbitmqUrl = process.env.RABBITMQ_URL;
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            
            amqp.connect(this.rabbitmqUrl, (connError, connection) => {
                if (connError) {
                    console.error("Error al conectar a RabbitMQ:", connError);
                    return reject(connError);
                }
                
                this.connection = connection as amqp.Connection; 

                this.connection!.createChannel((channelError, channel) => { 
                    if (channelError) {
                        console.error("Error al crear el canal:", channelError);
                        this.connection?.close();
                        return reject(channelError);
                    }
                    this.channel = channel;
                    console.log("[RabbitMQ] Canal creado y asignado.");

                    this.channel!.assertQueue(this.queueName, { 
                        durable: true
                    }, (assertError) => {
                        if (assertError) {
                            console.error("Error al asegurar la cola:", assertError);
                            this.connection?.close();
                            return reject(assertError);
                        }
                        
                        console.log("Conexión a RabbitMQ establecida y cola asegurada.");
                        resolve();
                    });
                });
            });
        });
    }

    public publish(message: any): boolean {
        if (!this.channel) {
            console.error("No hay un canal de RabbitMQ disponible.");
            return false;
        }

        const msgBuffer = Buffer.from(JSON.stringify(message));
        return this.channel.sendToQueue(this.queueName, msgBuffer, { persistent: true });
    }

    public getChannel(): amqp.Channel { 
        if (!this.channel) {
            throw new Error("El canal de RabbitMQ no ha sido inicializado.");
        }
        return this.channel;
    }

    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.connection) {
                this.connection.close((err) => {
                    if (err) {
                        return reject(err);
                    }
                    this.connection = null;
                    this.channel = null;
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}