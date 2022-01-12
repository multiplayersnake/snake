import React, { FC } from 'react';

import './ProfilePage.css';
import NavButton from '../../components/Button/NavButton';
import cn from 'classnames';
import Scroll from '../../components/Scroll/Scroll';
import coinSource from '../../assets/coin.png';
import awardSource from '../../assets/award.png';

import { part_arr } from './mock';
import { item_arr } from './mock';
import { user_selected } from './mock';
import SelectorShopItemComponent from '../../components/SelectorShopItem';

const ProfilePage: FC = () => {
  return (
    <div className="profile-page">
      <NavButton className={cn('button', 'button-profile-back')} to={'/main'}>
        В меню
      </NavButton>
      <div className={cn('title-profile')}>
        <div className={cn('heading', 'h6')}>Позывной: John</div>
        <div className={cn('heading', 'h6')}>
          Валюта: 150 <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
        </div>
        <div className={cn('heading', 'h6')}>
          Награды: 7 <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
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
