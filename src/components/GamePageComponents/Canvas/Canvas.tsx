import React, { FC, MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startGame } from '../../../core/core';

import { GameParameters, GameUser } from '../../../types';
import { getUser, getUserGameParameters, getUserNickname, RootState, setUser, showEndGame } from '../../../store';

import { part_arr } from '../../../database/mock';
import { item_arr } from '../../../database/mock';
import UserAPI from '../../../api/UserAPI';

import { mapToRawUser } from '../../../api/AuthAPI';

import './Canvas.css';

type OwnProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

type Props = OwnProps;

const Canvas: FC<Props> = () => {
  const dispatch = useDispatch();

  const userData = useSelector<RootState, GameUser>(getUser);
  const nickname = useSelector<RootState, string>(getUserNickname);
  const gameParameters = useSelector<RootState, GameParameters>(getUserGameParameters);

  // TODO с этим объектом надо будет поработать, скоре всего надо использовать локальный стейт....
  const userElements: { [k: string]: { [k: string]: string } } = {};

  gameParameters.parts.forEach((item, index) => {
    const itemElements = JSON.parse(item_arr[index][item].itemDesc);
    const partKey = part_arr[index].key;
    userElements[partKey] = itemElements;
  });
  userElements['base'] = { name: nickname };

  const endGame = useCallback(
    (time: string, place: number, coins: number, awards: number) => {
      dispatch(showEndGame(time, place, coins, awards));
      // ВАЖНОЕ ЗАМЕЧАНИЕ: !!!!
      // ВАЖНОЕ ЗАМЕЧАНИЕ: нельзя мутировать стейт, который достали из redux
      // ВАЖНОЕ ЗАМЕЧАНИЕ: !!!!
      const coinsUpdated = gameParameters.coins + coins;

      const gameParametersUpdated = { ...gameParameters, coins: coinsUpdated };
      const userDataUpdated = { ...userData, gameParameters: gameParametersUpdated };

      const rawUser = mapToRawUser(userDataUpdated);

      // TODO rework to async/await
      UserAPI.updateProfile(rawUser).then(() => {
        dispatch(setUser(userDataUpdated));
      });
    },
    [dispatch, userData, gameParameters]
  );

  const ref = useRef(null);

  const onClick = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
    const rectCanvas = ref.current.getBoundingClientRect();
    const x = e.pageX - rectCanvas.x;
    const y = e.pageY - rectCanvas.y;

    // Координаты кнопки раскрытия на полный экран
    if (x > 75 && x < 125 && y > 530 && y < 580) {
      ref.current.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');

    startGame(ctx, userElements, endGame);
  }, [endGame, userElements]);

  return <canvas className="canvas" ref={ref} onClick={onClick} width={1000} height={600} />;
};

export default Canvas;
