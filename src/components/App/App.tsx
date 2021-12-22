import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavMenu from '../NavMenu';

import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import LeaderboardPage from '../../pages/LeaderboardPage';
import ForumPage from '../../pages/ForumPage';
import GamePage from '../../pages/GamePage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <NavMenu hidden={false} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
