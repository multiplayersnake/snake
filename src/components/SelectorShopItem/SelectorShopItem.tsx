import React, { FC } from 'react';
import cn from 'classnames';

import './SelectorShopItem.css';
import Heading from '../Heading';
import ShopItem from '../ShopItem';

type IItem = {
  id: string;
  name: string;
  item_desc: string;
  item_price: number;
  item_condition: number;
};

type SelectorShopItemProps = {
  title: string;
  selected: IItem;
  items: IItem[];
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
          item_condition={selected.item_condition}
          item_price={selected.item_price}
          name={selected.name}
          desc={selected.item_desc}
        />
      </div>
      <div className={cn('selector-shop-item-items')}>
        {items.map((value, index) => (
          <ShopItem
            isSelected={false}
            key={index}
            item_condition={value.item_condition}
            item_price={value.item_price}
            name={value.name}
            desc={value.item_desc}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectorShopItemComponent;
