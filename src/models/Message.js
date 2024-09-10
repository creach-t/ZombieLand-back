import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/dbClientSequelize.js';

class Message extends Model {}

Message.init(
  {
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    sequelize,
    tableName: 'message',
  }
);

export default Message;
