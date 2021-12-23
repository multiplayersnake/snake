import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavMenu from '../NavMenu';
import ErrorBoundary from '../ErrorBoundary';

import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import LeaderboardPage from '../../pages/LeaderboardPage';
import ForumPage from '../../pages/ForumPage';
import GamePage from '../../pages/GamePage';

import './App.css';

const App: FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <NavMenu hidden={false} />
        <main className="content">
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/game" element={<GamePage />} />

              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
