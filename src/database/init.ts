import dotenv from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { IS_DEV } from '../../webpack/env';

import { topicModel } from './models/topic';
import { messageModel } from './models/message';
import { userModel } from './models/user';
import { mluModel } from './models/mlu';

dotenv.config();

const sequelizeOptions: SequelizeOptions = {
  host: IS_DEV ? 'localhost' : 'postgres',
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres'
};

export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
export const User = sequelize.define('User', userModel, {});
export const Topic = sequelize.define('Topic', topicModel, {});
export const Message = sequelize.define('Message', messageModel, {});
export const Mlu = sequelize.define('Mlu', mluModel, {});

// Создание внешних ключей и включение режима каскадного удаления данных
Message.hasOne(Mlu, {
  onDelete: 'CASCADE',
  foreignKey: 'mess_id'
});

Topic.hasOne(Message, {
  onDelete: 'CASCADE',
  foreignKey: 'topic_id'
});

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
