import React, { FC, useEffect, useRef } from 'react';
import { StartGame } from '../../core/core';
import './Canvas.css';

type OwnProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

type Props = OwnProps;

const Canvas: FC<Props> = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');

    StartGame(ctx);
  }, []);

  return <canvas className="canvas" ref={ref} width={1000} height={600} />;
};

export default Canvas;
