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
  selectFunction: (partKey: number, ItemKey: number) => void;
  partKey: number;
  purchasedItems: number[];
};

const SelectorShopItemComponent: FC<SelectorShopItemProps> = (props) => {
  const { title, selected, items, selectFunction, partKey, purchasedItems } = props;

  return (
    <div className="selector-shop-item">
      <Heading className={cn('selector-shop-item-title', 'h5')}>{title}</Heading>
      <Heading className={cn('selector-shop-item-subtitle', 'h5')}>{'Доступные варианты'}</Heading>
      <div className={cn('selector-shop-item-select')}>
        <ShopItem
          isSelected={true}
          isPurchased={true}
          itemCondition={selected.itemCondition}
          itemPrice={selected.itemPrice}
          name={selected.name}
          desc={selected.itemDesc}
          selectFunction={selectFunction}
          partKey={partKey}
          itemKey={-1}
        />
      </div>
      <div className={cn('selector-shop-item-items')}>
        {items.map((value, index) => (
          <ShopItem
            isSelected={false}
            isPurchased={purchasedItems.includes(index)}
            key={index}
            itemCondition={value.itemCondition}
            itemPrice={value.itemPrice}
            name={value.name}
            desc={value.itemDesc}
            selectFunction={selectFunction}
            partKey={partKey}
            itemKey={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectorShopItemComponent;
