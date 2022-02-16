import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ErrorBoundary } from '../ssrComponents';
import { TestPage } from '../ssrPages';

import '../styles/index.css';
import './SsrApp.css';

const ColdSsrApp: React.FC = () => {
  return (
    <div className="app">
      <main className="content">
        <ErrorBoundary>
          <Switch>
            <Route path="/">
              <TestPage />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export const SsrApp = hot(ColdSsrApp);
