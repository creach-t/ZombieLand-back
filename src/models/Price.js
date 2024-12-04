import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/dbClientSequelize.js';

class Price extends Model {}

Price.init(
  {
    price_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'price',
  }
);

export default Price;
