import React, { FC, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavMenu from '../NavMenu';
import ErrorBoundary from '../ErrorBoundary';

import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import LeaderboardPage from '../../pages/LeaderboardPage';
import ForumPage from '../../pages/ForumPage';
import GamePage from '../../pages/GamePage';

import AuthService from '../../services/AuthService';
import { User } from '../../types/models';

import './App.css';

const App: FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(undefined);
  }, []);

  useEffect(() => {
    async function checkAuthorization() {
      const user = await AuthService.checkAuthorization();
      setUser(user);
    }

    void checkAuthorization();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <NavMenu hidden={false} user={user} onLogout={handleLogout} />
        <main className="content">
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
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
