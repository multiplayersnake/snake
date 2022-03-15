import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ForumPage, GamePage, GameTypePage, LoginPage, MainPage, TopicPage, ProfilePage, SignupPage } from '../pages';
import { AuthorizedOnly, GuestOnly } from '../components';
import { useAuth } from '../hooks';

export const AppRoutes = () => {
  useAuth();

  return (
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
          <MainPage />
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

      <Route path="/topics">
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
  );
};
