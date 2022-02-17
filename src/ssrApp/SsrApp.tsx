import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Modal, ClientOnly } from '../components';
import { ErrorBoundary } from '../ssrComponents';
import { ForumPage, GamePage, GameTypePage, LoginPage, MainPage, MessagePage, ProfilePage, SignupPage } from '../pages';
import { useAuth } from '../hooks';

import '../styles/index.css';
import './SsrApp.css';

const ColdSsrApp: React.FC = () => {
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

            <Route path="/" exact>
              <ClientOnly>
                <MainPage onAction={handleAction} />
              </ClientOnly>
            </Route>

            <Route path="/game">
              <ClientOnly>
                <GamePage />
              </ClientOnly>
            </Route>

            <Route path="/profile">
              <ClientOnly>
                <ProfilePage />
              </ClientOnly>
            </Route>

            <Route path="/forum">
              <ClientOnly>
                <ForumPage />
              </ClientOnly>
            </Route>

            <Route path="/message/:id">
              <ClientOnly>
                <MessagePage />
              </ClientOnly>
            </Route>

            <Route path="/game-type">
              <ClientOnly>
                <GameTypePage />
              </ClientOnly>
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
