import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Root from './root';
import { NavMenu } from './navMenu';
import { hot } from 'react-hot-loader/root';

const Contacts: React.FC = () => <div>Contacts component</div>;

const SsrApp: React.FC = () => {
  // Попробуйте открыть приложение с разными значениями роутера и проверьте ответ от SSR-сервера
  return (
    <div>
      <NavMenu />
      <Switch>
        <Route exact={true} path="/" component={Root} />
        <Route exact={true} path="/home" component={Home} />
        <Route exact={true} path="/contacts" component={Contacts} />
      </Switch>
    </div>
  );
};

export default hot(SsrApp);
