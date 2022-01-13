import React, { FC } from 'react';
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
