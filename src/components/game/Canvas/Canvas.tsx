import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { gameStart } from '../../../core/core';
import { GameParameters } from '../../../types';
import {
  RootState,
  finishGame,
  getLevelValue,
  getUserGameParameters,
  getUserNickname,
  showModal
} from '../../../store';

import { part_arr } from '../../../database/mock';
import { item_arr } from '../../../database/mock';

import './Canvas.css';

type OwnProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

type Props = OwnProps;

export const Canvas: FC<Props> = () => {
  const dispatch = useDispatch();

  const nickname = useSelector<RootState, string>(getUserNickname);
  const gameParameters = useSelector<RootState, GameParameters>(getUserGameParameters);
  const level = useSelector<RootState, number>(getLevelValue);

  // TODO с этим объектом надо будет поработать, скоре всего надо использовать локальный стейт....
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userElements: { [k: string]: { [k: string]: string } } = {};

  gameParameters.parts.forEach((item, index) => {
    const itemElements = JSON.parse(item_arr[index][item].itemDesc);
    const partKey = part_arr[index].key;
    userElements[partKey] = itemElements;
  });
  userElements['base'] = { name: nickname };

  const exitGame = useCallback(() => {
    dispatch(
      showModal(`Вы уверены, что хотите прервать игру?`, async () => {
        window.history.back();
      })
    );
  }, [dispatch]);

  const endGame = useCallback(
    (time: string, isVictory: boolean, place: number, coins: number, awards: number) => {
      dispatch(finishGame(time, place, coins, awards, isVictory));
    },
    [dispatch]
  );

  const ref = useRef(null);

  useEffect(() => {
    gameStart(ref.current, userElements, endGame, level, exitGame);
  }, [exitGame, endGame, level, userElements]);

  return <canvas className="canvas" ref={ref} width={1000} height={600} />;
};
