import React, { FC } from 'react';
import cn from 'classnames';

import './SelectorShopItem.css';
import Heading from '../Heading';
import ShopItem from '../ShopItem';

type ItemType = {
  id: string;
  name: string;
  itemDesc: string;
  itemPrice: number;
  itemCondition: number;
};

type SelectorShopItemProps = {
  title: string;
  selected: ItemType;
  items: ItemType[];
};

const SelectorShopItemComponent: FC<SelectorShopItemProps> = (props) => {
  const { title, selected, items } = props;

  return (
    <div className="selector-shop-item">
      <Heading className={cn('selector-shop-item-title', 'h5')}>{title}</Heading>
      <Heading className={cn('selector-shop-item-subtitle', 'h5')}>{'Доступные варианты'}</Heading>
      <div className={cn('selector-shop-item-select')}>
        <ShopItem
          isSelected={true}
          itemCondition={selected.itemCondition}
          itemPrice={selected.itemPrice}
          name={selected.name}
          desc={selected.itemDesc}
        />
      </div>
      <div className={cn('selector-shop-item-items')}>
        {items.map((value, index) => (
          <ShopItem
            isSelected={false}
            key={index}
            itemCondition={value.itemCondition}
            itemPrice={value.itemPrice}
            name={value.name}
            desc={value.itemDesc}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectorShopItemComponent;
