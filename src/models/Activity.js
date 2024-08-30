import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/dbClientSequelize.js';

class Activity extends Model {}

Activity.init(
  {
    activity_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    minimal_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'activity',
  }
);

export default Activity;
