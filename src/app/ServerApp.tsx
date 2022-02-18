import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { Modal } from '../components/common/Modal';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useAuth } from '../hooks';

import '../styles/index.css';
import './App.css';

const ColdServerApp: React.FC = () => {
  const { handleAction } = useAuth();

  return (
    <div className="app">
      <Modal />
      <main className="content">
        <ErrorBoundary>
          <Switch>
            <Route path="/login">
              <LoginPage onAction={handleAction} />
            </Route>

            <Route path="/signup">
              <SignupPage onAction={handleAction} />
            </Route>
          </Switch>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export const ServerApp = hot(ColdServerApp);
