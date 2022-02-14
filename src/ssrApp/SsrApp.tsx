import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../ssrComponents/home';
import Root from '../ssrComponents/root';
import { NavMenu } from '../ssrComponents/navMenu';

import { hot } from 'react-hot-loader/root';

const ColdSsrApp: React.FC = () => {
  // Попробуйте открыть приложение с разными значениями роутера и проверьте ответ от SSR-сервера
  return (
    <div>
      <NavMenu />
      <Switch>
        <Route exact={true} path="/" component={Root} />
        <Route exact={true} path="/home" component={Home} />
      </Switch>
    </div>
  );
};

export const SsrApp = hot(ColdSsrApp);
