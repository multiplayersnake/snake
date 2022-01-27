import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState, getEndGameAwards, getEndGameCoins, getEndGamePlace, getEndGameTime } from '../../../store';
import { NavButton, Heading } from '../..';

import coinSource from '../../../assets/coin.png';
import awardSource from '../../../assets/award.png';

import './EndGame.css';

const EndGame: FC = () => {
  const time = useSelector<RootState, string>(getEndGameTime);
  const place = useSelector<RootState, number>(getEndGamePlace);
  const coins = useSelector<RootState, number>(getEndGameCoins);
  const awards = useSelector<RootState, number>(getEndGameAwards);

  // visibilityClass не нужен, так как видимость компонента теперь управляется из GamePage,
  // так тоже можно делать - часто может быть удобнее и эффективнее

  return (
    <div className="end-game">
      <Heading tag="h1">
        {/* ВАЖНО не стоит использовать стили с других страниц - в нашем проекте предполагается, что у каждой страницы отдельные стили */}
        Игра окончена
      </Heading>

      <Heading tag="h2">Ваши результаты</Heading>
      {/* ВАЖНО не стоит использовать стили компонентов отдельно от них */}
      <Heading tag="h6">Вы заняли {place} место</Heading>

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
