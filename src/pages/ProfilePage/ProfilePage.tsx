import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import './ProfilePage.css';
import NavButton from '../../components/Button/NavButton';
import Scroll from '../../components/Scroll/Scroll';
import coinSource from '../../assets/coin.png';
import awardSource from '../../assets/award.png';

import { part_arr } from './mock';
import { item_arr } from './mock';
// import { user_selected } from './mock';
import SelectorShopItemComponent from '../../components/SelectorShopItem';
import { User } from '../../types/models';
import { GameParameters } from '../../types/models';

const ProfilePage: FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userData: User = useSelector((state) => state['user']['item']);

  // Игровые данные пользователя договорились пока хранить в поле second_name
  const userParameters: GameParameters = JSON.parse(userData.second_name);
  const user_selected = [userParameters.head, userParameters.body, userParameters.tail, userParameters.elixir];
  return (
    <div className="profile-page">
      <NavButton className={cn('button', 'button-profile-back')} to={'/main'}>
        В меню
      </NavButton>
      <div className={cn('title-profile')}>
        <div className={cn('heading', 'h6')}>Позывной: {userData.display_name}</div>
        <div className={cn('heading', 'h6')}>
          Валюта: {userParameters.coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
        </div>
        <div className={cn('heading', 'h6')}>
          Награды: {userParameters.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
        </div>
      </div>
      <div className={cn('items-profile')}>
        <Scroll title={''} mode={'First'}>
          {part_arr.map((value, index) => (
            <SelectorShopItemComponent
              key={index}
              title={value.name}
              selected={item_arr[index][user_selected[index]]}
              items={item_arr[index]}
            />
          ))}
        </Scroll>
      </div>
    </div>
  );
};

export default ProfilePage;
