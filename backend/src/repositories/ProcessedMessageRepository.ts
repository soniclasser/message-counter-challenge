import { injectable } from 'tsyringe';
import { ProcessedMessage } from '../models/ProcessedMessage';

@injectable()
export class ProcessedMessageRepository {
  public async create(data: any, options: any): Promise<ProcessedMessage | void> {
    return ProcessedMessage.create(data, options);
  }
}
