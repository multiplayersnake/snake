import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';

import { configureStore } from './store/configureStore';
import { getInitialState } from './store/getInitialState';
import { ServerApp } from './app/ServerApp';
import favicon from './assets/images/favicon.ico';

export function serverRenderMiddleware(req: Request, res: Response) {
  const location = req.url;
  const context: StaticRouterContext = {};

  const initialState = getInitialState(location);
  const { store } = configureStore(initialState, location);

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <ServerApp />
      </StaticRouter>
    </ReduxProvider>
  );
  const reactHtml = renderToString(jsx);
  const reduxState = store.getState();

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  res.status(context.statusCode || 200).send(getHtml(reactHtml, reduxState));
}

function getHtml(reactHtml: string, reduxState = {}) {
  return `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8"">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="icon" href="${favicon}" type="image/x-icon" />
            <title>Боевые змеи</title>
            <link href="/main.css" rel="stylesheet">
        </head>
        <body>
            <div id="mount">${reactHtml}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            <script src="/main.js"></script>
        </body>
        </html>
    `;
}
