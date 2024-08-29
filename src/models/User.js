import { DataTypes, Model } from "sequelize";
import sequelize from '../database/dbClientSequelize.js';

class User extends Model {}

User.init(
    {
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'user',
    },
);

export default User;