import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavMenu from '../NavMenu';
import ErrorBoundary from '../ErrorBoundary';

import ForumPage from '../../pages/ForumPage';
import GamePage from '../../pages/GamePage';
import LoginPage from '../../pages/LoginPage';
import MainPage from '../../pages/MainPage';
import ProfilePage from '../../pages/ProfilePage';
import SignupPage from '../../pages/SignupPage';
import MessagePage from '../../pages/MessagePage';
import GameTypePage from '../../pages/GameTypePage';

import useAuth from '../../hooks/useAuth';

import './App.css';

const App: FC = () => {
  const { AuthorizedOnly, GuestOnly, authorized, user, handleAction } = useAuth();
  // Игровые данные пользователя договорились пока хранить в поле second_name
  // Если поле не начинается со записи {"snake":true, значит этот пользователь только что зарегистрировался и ему нужно
  // создать параметры по умолчанию
  if (user !== null) {
    if (user.second_name.substring(0, 13) !== '{"snake":true') {
      const startParameters = {
        snake: true,
        coins: 9000,
        awards: 500,
        head: 1,
        body: 1,
        tail: 1,
        elixir: 0
      };
      user.second_name = JSON.stringify(startParameters);
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_USER_ITEM', item: user });
  }, [user]);

  return (
    <div className="app">
      <BrowserRouter>
        <main className="content">
          <ErrorBoundary>
            <Routes>
              <Route
                path="/login"
                element={
                  <GuestOnly>
                    <LoginPage onAction={handleAction} />
                  </GuestOnly>
                }
              />
              <Route
                path="/signup"
                element={
                  <GuestOnly>
                    <SignupPage />
                  </GuestOnly>
                }
              />
              <Route
                path="/"
                element={
                  <AuthorizedOnly>
                    <MainPage authorized={authorized} onAction={handleAction} />
                  </AuthorizedOnly>
                }
              />
              <Route
                path="/game"
                element={
                  <AuthorizedOnly>
                    <GamePage />
                  </AuthorizedOnly>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthorizedOnly>
                    <ProfilePage />
                  </AuthorizedOnly>
                }
              />
              <Route
                path="/forum"
                element={
                  <AuthorizedOnly>
                    <ForumPage />
                  </AuthorizedOnly>
                }
              />
              <Route
                path="/message"
                element={
                  <AuthorizedOnly>
                    <MessagePage />
                  </AuthorizedOnly>
                }
              />
              <Route
                path="/game-type"
                element={
                  <AuthorizedOnly>
                    <GameTypePage />
                  </AuthorizedOnly>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <NavMenu hidden={false} user={user} onAction={handleAction} />
      </BrowserRouter>
    </div>
  );
};

export default App;
