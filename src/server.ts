import 'babel-polyfill';
import path from 'path';
import express, { RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import config from '../webpack/client.config';
import { IS_DEV } from '../webpack/env';

import { serverRenderMiddleware } from './serverRenderMiddleware';
import { topicModel } from './models/topic';
import { messageModel } from './models/message';

function getWebpackMiddlewares(config: webpack.Configuration): RequestHandler[] {
  const compiler = webpack({ ...config, mode: 'development' });

  return [
    // Middleware для Webpack-билда проекта в реальном времени. Низкоуровневый аналог webpack-dev-server
    devMiddleware(compiler, {
      publicPath: config.output.publicPath
    }),
    // Middleware для HMR
    hotMiddleware(compiler, { path: `/__webpack_hmr` })
  ];
}

const app = express();

// Отдаём статику приложения
app.use(express.static(path.resolve(__dirname, '../dist')));

// На все get запросы запускаем сначала middleware dev server, а потом middleware рендеринга приложения
if (IS_DEV) {
  app.use(...getWebpackMiddlewares(config));
}

// Пока не можем проверить авторизацию, пускаем юзера только страницы входа и регистрации
app.get(['/login', '/signup'], serverRenderMiddleware);

// Обработка запросов к базе данных
app.get([`/api/messages/get/:topic_id`], async (req, res) => {
  const topic_id = req.params.topic_id;
  const result = await Message.findAll({
    where: {
      topic_id: topic_id
    }
  });
  res.status(200).send(result);
});

app.post([`/api/messages/set`], (req, res) => {
  req.on('data', async function (chunk) {
    const data = JSON.parse(chunk.toString());
    await Message.create({
      topic_id: data.topic_id,
      author: data.author,
      content: data.content
    });
    res.status(200).send('OK');
  });
});

// При запросе всех остальных страниц перенаправляем на страницу входа
app.get('*', (request, response) => {
  response.redirect('/login');
});

export { app };

require('dotenv').config();

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
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
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

dbConnect().then(() => {
  console.log('Полный Успех');
});
