import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { Modal, ErrorBoundary } from '../components/common';

import '../styles/index.css';
import './App.css';

const ColdServerApp: React.FC = () => {
  return (
    <div className="app">
      <Modal />
      <main className="content">
        <ErrorBoundary>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/signup">
              <SignupPage />
            </Route>
          </Switch>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export const ServerApp = hot(ColdServerApp);
