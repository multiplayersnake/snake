import React, { FC } from 'react';

import './GameTypePage.css';
import NavButton from '../../components/Button/NavButton';
import cn from 'classnames';
import coinSource from '../../assets/coin.png';
import awardSource from '../../assets/award.png';

const GameTypePage: FC = () => {
  return (
    <div className="game-type-page">
      <NavButton className={cn('button', 'button-game-type-back')} to={'/main'}>
        В меню
      </NavButton>
      <div className={cn('title-game-type')}>
        <div className={cn('heading', 'h6')}>Позывной: John</div>
        <div className={cn('heading', 'h6')}>
          Валюта: 150 <img src={coinSource} className={cn('img-in-line')} alt={''} />
        </div>
        <div className={cn('heading', 'h6')}>
          Награды: 7 <img src={awardSource} className={cn('img-in-line')} alt={''} />
        </div>
      </div>
      <div className={cn('menu-game-type')}>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>Тренировка</div>
          <div className={'game-type-desc'}>
            Это режим одиночной игры. В этом режиме вы можете зарабатывать валюту, однако не будете получать наград.
          </div>
          <NavButton className={cn('button')} to={'/game'}>
            Начать
          </NavButton>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>2 игрока</div>
          <div className={'game-type-desc'}>В разработке...</div>
          <div> </div>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>3 игрока</div>
          <div className={'game-type-desc'}>В разработке...</div>
          <div> </div>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>4 игрока</div>
          <div className={'game-type-desc'}>В разработке...</div>
          <div> </div>
        </div>
      </div>
    </div>
  );
};

export default GameTypePage;
