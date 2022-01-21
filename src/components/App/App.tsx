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

import Alert from '../ModalComponents/Alert';
import Confirm from '../ModalComponents/Confirm';
import useAuth from '../../hooks/useAuth';

import './App.css';

const App: FC = () => {
  const { AuthorizedOnly, GuestOnly, authorized, user, handleAction } = useAuth();
  // Игровые данные пользователя договорились пока хранить в поле second_name
  // Если поле не начинается со записи {"snake":code, значит этот пользователь только что зарегистрировался и ему нужно
  // создать параметры по умолчанию
  if (user !== null) {
    const userData = user.second_name ? JSON.parse(user.second_name) : {};
    if (userData.snake !== 1005) {
      const startParameters = {
        snake: 1005,
        coins: 9000,
        awards: 500,
        parts: [0, 0, 0]
      };
      user.second_name = JSON.stringify(startParameters);
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_USER_ITEM', item: user });
  }, [dispatch, user]);

  return (
    <div className="app">
      <Alert />
      <Confirm />
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
                    <SignupPage onAction={handleAction} />
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
