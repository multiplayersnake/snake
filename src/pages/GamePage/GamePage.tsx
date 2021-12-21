import React, { FC } from 'react';

import Button from '../../components/Button';

import './GamePage.css';

const GamePage: FC = () => {
  return (
    <div className="game-page">
      <h1>Здесь будет игровое поле...</h1>
      <Button>OK</Button>
    </div>
  );
};

export default GamePage;
