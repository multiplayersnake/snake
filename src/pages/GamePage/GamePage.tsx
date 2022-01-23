import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Canvas from '../../components/GamePageComponents/Canvas';
import EndGame from '../../components/GamePageComponents/EndGame';
import { clearGame } from '../../core/core';
import { hideEndGame } from '../../store/reducers/endGame';

import './GamePage.css';

const GamePage: FC = () => {
  const dispatch = useDispatch();

  const resetGamePage = useCallback(() => {
    clearGame();
    dispatch(hideEndGame());
  }, [dispatch]);

  useEffect(() => {
    return resetGamePage;
  }, [resetGamePage]);

  return (
    <div className="game-page">
      <EndGame />
      <Canvas />
    </div>
  );
};

export default GamePage;
