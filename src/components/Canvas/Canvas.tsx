import React, { FC, MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { startGame } from '../../core/core';
import { GameParameters, User } from '../../types/models';
import { RootState } from '../../index';
import { part_arr } from '../../database/mock';
import { item_arr } from '../../database/mock';

import './Canvas.css';

type OwnProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

type Props = OwnProps;

const Canvas: FC<Props> = () => {
  const userData: User = useSelector((state: RootState) => state['user']['item']);
  const userParameters: GameParameters = JSON.parse(userData.second_name);
  const userElements: { [k: string]: { [k: string]: string } } = {};

  userParameters.parts.forEach((item, index) => {
    const itemElements = JSON.parse(item_arr[index][item].itemDesc);
    const partKey = part_arr[index].key;
    userElements[partKey] = itemElements;
  });

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

    startGame(ctx, userElements);
  }, []);

  return <canvas className="canvas" ref={ref} onClick={onClick} width={1000} height={600} />;
};

export default Canvas;
