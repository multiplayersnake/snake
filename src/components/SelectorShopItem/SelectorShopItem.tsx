import React, { FC } from 'react';
import cn from 'classnames';

import './SelectorShopItem.css';
import Heading from '../Heading';

type IItem = {
  id: string;
  name: string;
  item_desc: string;
};

type SelectorShopItemProps = {
  title: string;
  selected: number;
  items: IItem[];
};

const SelectorShopItemComponent: FC<SelectorShopItemProps> = (props) => {
  const { title, selected, items } = props;

  return (
    <div className="selector-shop-item">
      <Heading className={cn('selector-shop-item-title', 'h5')}>{title}</Heading>
      <Heading className={cn('selector-shop-item-subtitle', 'h5')}>{'Доступные варианты'}</Heading>
      <div className={cn('selector-shop-item-select', 'one-item')}>{selected}</div>
      <div className={cn('selector-shop-item-items')}>
        {items.map((value, index) => (
          <div key={index} className={cn('one-item')}>
            {value.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectorShopItemComponent;
