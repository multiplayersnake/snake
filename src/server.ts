import 'babel-polyfill';
import path from 'path';
import express, { RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import config from '../webpack/client.config';
import { IS_DEV } from '../webpack/env';

import { serverRenderMiddleware } from './serverRenderMiddleware';
import { dbConnect } from './database/init';

import * as db from './database/index';

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
  res.status(200).send(await db.getMessages(req.params.topic_id));
});

app.post([`/api/messages/set`], (req, res) => {
  req.on('data', async function (chunk) {
    await db.newMessage(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
});

// При запросе всех остальных страниц перенаправляем на страницу входа
app.get('*', (request, response) => {
  response.redirect('/login');
});

dbConnect().then(() => {
  console.log('Соединение с базой данных установлено');
});

export { app };
