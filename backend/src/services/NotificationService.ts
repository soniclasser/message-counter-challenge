import { injectable } from 'tsyringe';
import axios from 'axios';

const EXTERNAL_API_URL = `http://api:${process.env.PORT || 3000}/api/v1/mock/daily-total`;

@injectable()
export class NotificationService {
  public async sendDailyTotal(payload: any): Promise<void> {
    await axios.post(EXTERNAL_API_URL, payload);
  }
}
