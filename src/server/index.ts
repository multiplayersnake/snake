import path from 'path';
import express from 'express';

import { IS_DEV } from '../../webpack/env';
import { dbConnect } from '../database';

import { messagesPaths, routesPaths } from './paths';
import { serverRenderMiddleware, getDevModeMiddlewares } from './middlewares';
import { createMessageHandler, deleteMessageHandler, readMessagesHandler, updateMessageHandler } from './handlers';

const app = express();

app
  // Отдаём статику приложения
  .use(express.static(path.resolve(__dirname, '../dist')))
  // На все get запросы запускаем сначала middleware dev server, а потом middleware рендеринга приложения
  .use(...getDevModeMiddlewares());

// Обработка запросов к базе данных
// CRUD для объекта Message
app
  .post(messagesPaths.index, createMessageHandler)
  .get(messagesPaths.withTopicId, readMessagesHandler)
  .put(messagesPaths.index, updateMessageHandler)
  .delete(messagesPaths.index, deleteMessageHandler);

// Пока не можем проверить авторизацию, в боевом режиме пускаем юзера только страницы входа и регистрации
const allowedPages = IS_DEV ? [routesPaths.any] : [routesPaths.login, routesPaths.signup];
app.get(allowedPages, serverRenderMiddleware);

// При запросе всех остальных страниц в боевом режиме перенаправляем на страницу входа
if (!IS_DEV) {
  app.get(routesPaths.any, (req, res) => {
    const { code } = req.query;
    const redirectUrl = code ? `${routesPaths.login}?code=${code}` : routesPaths.login;

    res.redirect(redirectUrl);
  });
}

dbConnect().then(() => {
  console.log('Соединение с базой данных установлено');
});

export { app };
