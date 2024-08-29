import { DataTypes, Model } from "sequelize";
import sequelize from '../database/dbClientSequelize.js';

class Category extends Model {}

Category.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'category',
    },
);

export default Category;