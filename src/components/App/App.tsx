import React, { FC, useEffect } from 'react';
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
  const { authorized, user, checkAuthorization, handleAction } = useAuth();

  useEffect(() => {
    void checkAuthorization();
  }, [checkAuthorization]);

  return (
    <div className="app">
      <BrowserRouter>
        <main className="content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<MainPage authorized={authorized} onAction={handleAction} />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/login" element={<LoginPage onAction={handleAction} />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/message" element={<MessagePage />} />
              <Route path="/game-type" element={<GameTypePage />} />

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
