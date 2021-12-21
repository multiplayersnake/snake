import React, { FC } from 'react';
import Canvas from '../../components/Canvas';

import './GamePage.css';

const GamePage: FC = () => {
  return (
    <div className="game-page">
      <Canvas />
    </div>
  );
};

export default GamePage;
