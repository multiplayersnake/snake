import 'babel-polyfill';
import path from 'path';
import express, { RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import config from '../webpack/client.config';
import { IS_DEV } from '../webpack/env';

import { serverRenderMiddleware } from './server-render-middleware';

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

app.use('*', (request, response) => {
  response.redirect('/login');
});

export { app };
