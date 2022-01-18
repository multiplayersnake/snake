import React, { FC, MouseEvent, useCallback, useEffect, useRef } from 'react';
import { startGame } from '../../core/core';
import './Canvas.css';

type OwnProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

type Props = OwnProps;

const Canvas: FC<Props> = () => {
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

    startGame(ctx);
  }, []);

  return <canvas className="canvas" ref={ref} onClick={onClick} width={1000} height={600} />;
};

export default Canvas;
