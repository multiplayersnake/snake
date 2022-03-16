import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startGame } from '../../../core/core';

import { GameParameters, GameUser } from '../../../types';
import { getUser, getUserGameParameters, getUserNickname, RootState, showEndGame } from '../../../store';

import { part_arr } from '../../../database/mock';
import { item_arr } from '../../../database/mock';

import { leaderBoardAPI, externalUserAPI, mapToRawUser } from '../../../api';

import './Canvas.css';

type OwnProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

type Props = OwnProps;

export const Canvas: FC<Props> = () => {
  const dispatch = useDispatch();

  const userData = useSelector<RootState, GameUser>(getUser);
  const nickname = useSelector<RootState, string>(getUserNickname);
  const gameParameters = useSelector<RootState, GameParameters>(getUserGameParameters);

  // TODO с этим объектом надо будет поработать, скоре всего надо использовать локальный стейт....
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userElements: { [k: string]: { [k: string]: string } } = {};

  gameParameters.parts.forEach((item, index) => {
    const itemElements = JSON.parse(item_arr[index][item].itemDesc);
    const partKey = part_arr[index].key;
    userElements[partKey] = itemElements;
  });
  userElements['base'] = { name: nickname };

  const endGame = useCallback(
    (time: string, place: number, coins: number, awards: number) => {
      // TODO это надо перевести на redux
      dispatch(showEndGame(time, place, coins, awards));

      const coinsUpdated = gameParameters.coins + coins;
      const awardsUpdated = gameParameters.awards + awards;
      const gameParametersUpdated = { ...gameParameters, coins: coinsUpdated, awards: awardsUpdated };
      const userDataUpdated = { ...userData, gameParameters: gameParametersUpdated };

      const rawUser = mapToRawUser(userDataUpdated);
      void externalUserAPI.updateProfile(rawUser);
      void leaderBoardAPI.setUserResult({ user: rawUser.first_name, awards: awardsUpdated });
    },
    [dispatch, userData, gameParameters]
  );

  const ref = useRef(null);

  useEffect(() => {
    startGame(ref.current, userElements, endGame);
  }, [endGame, userElements]);

  return <canvas className="canvas" ref={ref} width={1000} height={600} />;
};
