import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ForumPage, GamePage, GameTypePage, LoginPage, MainPage, MessagePage, ProfilePage, SignupPage } from '../pages';
import { AuthorizedOnly, GuestOnly } from '../components';
import { useAuth } from '../hooks';

export const AppRoutes = () => {
  const { handleAction } = useAuth();

  return (
    <Switch>
      <Route path="/login">
        <GuestOnly>
          <LoginPage onAction={handleAction} />
        </GuestOnly>
      </Route>

      <Route path="/signup">
        <GuestOnly>
          <SignupPage onAction={handleAction} />
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

      <Route path="/forum">
        <AuthorizedOnly>
          <ForumPage />
        </AuthorizedOnly>
      </Route>

      <Route path="/message/:id">
        <AuthorizedOnly>
          <MessagePage />
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
