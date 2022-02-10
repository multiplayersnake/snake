import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ForumPage, GamePage, GameTypePage, LoginPage, MainPage, MessagePage, ProfilePage, SignupPage } from '../pages';

import { useAuth } from '../hooks';

import { ErrorBoundary, Modal, AuthorizedOnly, GuestOnly } from '../components';

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
