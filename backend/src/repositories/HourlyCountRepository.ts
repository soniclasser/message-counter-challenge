import { injectable } from 'tsyringe';
import { Op } from 'sequelize';
import { HourlyCount } from '../models/HourlyCount';

@injectable()
export class HourlyCountRepository {
  public async findOrCreate(where: any, defaults: any): Promise<[HourlyCount, boolean]> {
    return HourlyCount.findOrCreate({ where, defaults });
  }

  public async increment(instance: HourlyCount, fields: any, options: any): Promise<HourlyCount | void> {
    return instance.increment(fields, options);
  }

  public async sum(field: any, options: any): Promise<number> {
    return HourlyCount.sum(field, options);
  }

  public async findAll(options: any): Promise<HourlyCount[]> {
    return HourlyCount.findAll(options);
  }
}
