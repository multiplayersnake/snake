import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';

import ForumPage from '../pages/ForumPage';
import GamePage from '../pages/GamePage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import ProfilePage from '../pages/ProfilePage';
import SignupPage from '../pages/SignupPage';
import MessagePage from '../pages/MessagePage';
import GameTypePage from '../pages/GameTypePage';

import useAuth from '../hooks/useAuth';

// обратите внимание как просто можно указывать путь до компонента, если перейти с дефолтных импортов на обычные
// и создать набор индексных файлов в папках внутри components
import { Modal } from '../components';

import AuthorizedOnly from '../components/auth/AuthorizedOnly';
import GuestOnly from '../components/auth/GuestOnly';

import './App.css';

export const App: FC = () => {
  const { handleAction } = useAuth();

  return (
    <div className="app">
      <Modal />
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
                    <MainPage onAction={handleAction} />
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
      </BrowserRouter>
    </div>
  );
};
