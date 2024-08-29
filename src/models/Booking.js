import { DataTypes, Model } from "sequelize";
import sequelize from '../database/dbClientSequelize.js';

class Booking extends Model {}

Booking.init(
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nb_tickets: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'booking',
    },
);

export default Booking;