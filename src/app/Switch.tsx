import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { AuthorizedOnly, GuestOnly } from '../components';
import { ForumPage, GamePage, GameTypePage, LoginPage, MainPage, MessagePage, ProfilePage, SignupPage } from '../pages';
import React, { useEffect } from 'react';
import { useAuth } from '../hooks';
import AuthService from '../services/AuthService';

export const Router = () => {
  const { handleAction } = useAuth();
  const { search } = useLocation();

  useEffect(() => {
    const parsed = new URLSearchParams(search);
    const code = parsed.get('code');
    if (code) {
      AuthService.sendOauthCode(code).then(() => {
        AuthService.checkAuthorization()
      })

    }
  }, []);
  return (<Switch>
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
  </Switch>)
}
