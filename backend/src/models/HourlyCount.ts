import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';

export class HourlyCount extends Model {
  public account_id!: string;
  public rounded_hour!: Date;
  public message_count!: number;
}

HourlyCount.init({
  account_id: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  rounded_hour: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  message_count: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
  },
}, {
  sequelize,
  tableName: 'hourly_counts',
  modelName: 'HourlyCount',
  underscored: true,
});