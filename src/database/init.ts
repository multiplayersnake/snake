import dotenv from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { topicModel } from './models/topic';
import { messageModel } from './models/message';

dotenv.config();

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres'
};

export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
export const Topic = sequelize.define('Topic', topicModel, {});
export const Message = sequelize.define('Message', messageModel, {});

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
