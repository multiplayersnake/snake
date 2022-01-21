import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import NavButton from '../../Button/NavButton';
import Heading from '../../Heading';

import coinSource from '../../../assets/coin.png';
import awardSource from '../../../assets/award.png';

import { RootState } from '../../../store';

import './EndGame.css';

const EndGame: FC = () => {
  const time = useSelector<RootState, string>((state: RootState) => state.endGame.time);
  const place = useSelector<RootState, number>((state: RootState) => state.endGame.place);
  const coins = useSelector<RootState, number>((state: RootState) => state.endGame.coins);
  const awards = useSelector<RootState, number>((state: RootState) => state.endGame.awards);
  const isVisible = useSelector<RootState, boolean>((state: RootState) => state.endGame.isVisible);

  // TODO rework as Modal
  const visibilityClass = isVisible ? 'show' : 'hide';

  return (
    <div className={cn('end-game', visibilityClass)}>
      <Heading tag="h1" className={cn('title-forum')}>
        Игра окончена
      </Heading>

      <Heading tag="h2">Ваши результаты</Heading>
      <div className={cn('heading', 'h6')}>Вы заняли {place} место</div>
      <div className={cn('heading', 'h6')}>Время игры: {time}</div>
      <div className={cn('heading', 'h6')}>
        Заработано валюты: {coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
      </div>
      <div className={cn('heading', 'h6')}>
        Получено наград: {awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
      </div>
      <NavButton className={cn('button')} to={'/main'}>
        ОК
      </NavButton>
    </div>
  );
};

export default EndGame;
