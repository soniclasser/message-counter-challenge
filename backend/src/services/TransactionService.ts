import { injectable } from 'tsyringe';
import sequelize from '../config/config';
import { Transaction } from 'sequelize';

@injectable()
export class TransactionService {
  public async transaction<T>(autoCallback: (t: Transaction) => Promise<T>): Promise<T> {
    return sequelize.transaction(autoCallback);
  }
}
