import path from 'path';
import express, { RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import config from '../webpack/client.config';
import { IS_DEV } from '../webpack/env';
import { serverRenderMiddleware } from './serverRenderMiddleware';

import { dbConnect } from './database';
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

// Обработка запросов к базе данных

// CRUD для объекта Message
app.post([`/api/messages`], (req, res) => {
  req.on('data', async function (chunk) {
    await db.createMessage(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
});

app.get([`/api/messages/:topic_id`], async (req, res) => {
  res.status(200).send(await db.readMessage(req.params.topic_id));
});

app.put([`/api/messages`], (req, res) => {
  req.on('data', async function (chunk) {
    await db.updateMessage(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
});

app.delete([`/api/messages`], (req, res) => {
  req.on('data', async function (chunk) {
    await db.deleteMessage(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
});

// Пока не можем проверить авторизацию, в боевом режиме пускаем юзера только страницы входа и регистрации
const allowedPages = IS_DEV ? ['*'] : ['/login', '/signup'];
app.get(allowedPages, serverRenderMiddleware);

// При запросе всех остальных страниц в боевом режиме перенаправляем на страницу входа
if (!IS_DEV) {
  app.get('*', (request, response) => {
    const { code } = request.query;
    const redirectUrl = code ? `/login?code=${code}` : '/login';

    response.redirect(redirectUrl);
  });
}

dbConnect().then(() => {
  console.log('Соединение с базой данных установлено');
});

export { app };
