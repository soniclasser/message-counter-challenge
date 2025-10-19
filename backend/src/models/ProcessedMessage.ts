import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';

export class ProcessedMessage extends Model {
  public message_id!: string;
  public account_id!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

ProcessedMessage.init({
  message_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  account_id: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  tableName: 'processed_messages',
  modelName: 'ProcessedMessage',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});