import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || '';


export const sequelize = new Sequelize(DATABASE_URL, { logging: (process.env.NODE_ENV === 'development') ? console.log : false});

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}