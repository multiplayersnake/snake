import React, { FC, useEffect } from 'react';
import Canvas from '../../components/Canvas';
import { clearGame } from '../../core/core';
import './GamePage.css';

const GamePage: FC = () => {
  const resetGamePage = () => {
    clearGame();
  };

  useEffect(() => {
    return resetGamePage;
  }, []);

  return (
    <div className="game-page">
      <Canvas />
    </div>
  );
};

export default GamePage;
