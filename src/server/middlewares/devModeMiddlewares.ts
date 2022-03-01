import { RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import { IS_DEV } from '../../../webpack/env';
import config from '../../../webpack/client.config';

export function getDevModeMiddlewares(): RequestHandler[] {
  if (IS_DEV) return [];

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
