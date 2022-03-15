import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ForumPage, GamePage, GameTypePage, LoginPage, MainPage, TopicPage, ProfilePage, SignupPage } from '../pages';
import { Modal, GuestOnly, AuthorizedOnly, ErrorBoundary } from '../components';
import { useAuth } from '../hooks';

import '../styles/index.css';
import './App.css';

const ColdClientApp: React.FC = () => {
  const { handleAction } = useAuth();

  return (
    <div className="app">
      <Modal />
      <main className="content">
        <ErrorBoundary>
          <Switch>
            <Route path="/login">
              <GuestOnly>
                <LoginPage />
              </GuestOnly>
            </Route>

            <Route path="/signup">
              <GuestOnly>
                <SignupPage />
              </GuestOnly>
            </Route>

            <Route path="/" exact>
              <AuthorizedOnly>
                <MainPage onAction={handleAction} />
              </AuthorizedOnly>
            </Route>

            <Route path="/game">
              <AuthorizedOnly>
                <GamePage />
              </AuthorizedOnly>
            </Route>

            <Route path="/profile">
              <AuthorizedOnly>
                <ProfilePage />
              </AuthorizedOnly>
            </Route>

            <Route path="/topics" exact>
              <AuthorizedOnly>
                <ForumPage />
              </AuthorizedOnly>
            </Route>

            <Route path="/topics/:id">
              <AuthorizedOnly>
                <TopicPage />
              </AuthorizedOnly>
            </Route>

            <Route path="/game-type">
              <AuthorizedOnly>
                <GameTypePage />
              </AuthorizedOnly>
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

export const ClientApp = hot(ColdClientApp);
