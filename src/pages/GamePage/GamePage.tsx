import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideEndGame, getIsGameOver, RootState, saveGameResults, getEndGameCoins } from '../../store';
import { Canvas, EndGame } from '../../components';
import { clearGame } from '../../core/core';

import './GamePage.css';

export const GamePage: FC = () => {
  const isGameOver = useSelector<RootState, boolean>(getIsGameOver);
  const coins = useSelector<RootState, number>(getEndGameCoins);

  const dispatch = useDispatch();

  const resetGamePage = useCallback(() => {
    clearGame();
    dispatch(hideEndGame());
  }, [dispatch]);

  useEffect(() => {
    if (isGameOver) {
      dispatch(saveGameResults({ coins }));
    }
  }, [coins, dispatch, isGameOver]);

  useEffect(() => resetGamePage, [resetGamePage]);

  return <div className="game-page">{isGameOver ? <EndGame /> : <Canvas />}</div>;
};
