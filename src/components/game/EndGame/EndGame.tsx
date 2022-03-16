import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState, getEndGameAwards, getEndGameCoins, getEndGameTime, getEndGameIsVictory } from '../../../store';
import { NavButton, Heading } from '../..';

import coinSource from '../../../assets/images/coin.png';
import awardSource from '../../../assets/images/award.png';

import './EndGame.css';
import mscMain from '../../../assets/sound/endgame.mp3';

import srcVictory from '../../../assets/images/victory.png';
import srcLoose from '../../../assets/images/loose.png';

export const EndGame: FC = () => {
  const time = useSelector<RootState, string>(getEndGameTime);
  const coins = useSelector<RootState, number>(getEndGameCoins);
  const awards = useSelector<RootState, number>(getEndGameAwards);
  const isVictory = useSelector<RootState, boolean>(getEndGameIsVictory);

  const title = isVictory ? 'Победа!' : 'Неудача...';
  const srcImg = isVictory ? srcVictory : srcLoose;

  return (
    <div className="end-game">
      <audio id={'mainMusic'} src={mscMain} autoPlay={true} preload={'auto'} loop={true} />
      <Heading tag="h1">{title}</Heading>

      <img src={srcImg} alt={'Итог'} />

      <Heading tag="h2">Ваши результаты</Heading>

      <Heading tag="h6">Время игры: {time}</Heading>

      <Heading tag="h6">
        Заработано валюты: {coins} <img src={coinSource} className="img-in-line" alt="coin" />
      </Heading>

      <Heading tag="h6">
        Получено наград: {awards} <img src={awardSource} className="img-in-line" alt="award" />
      </Heading>

      <NavButton to="/main">ОК</NavButton>
    </div>
  );
};

export default EndGame;
