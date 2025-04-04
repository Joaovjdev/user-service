import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const database = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'user_service',
  logging: false,
}); 