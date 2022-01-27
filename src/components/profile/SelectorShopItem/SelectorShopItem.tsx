import React, { FC } from 'react';
import cn from 'classnames';

import { Heading } from '../..';
import { ShopItem } from '../ShopItem';

import './SelectorShopItem.css';

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

export const SelectorShopItem: FC<SelectorShopItemProps> = (props) => {
  const { title, selected, items, selectFunction, partKey, purchasedItems } = props;

  return (
    <div className="selector-shop-item">
      <Heading tag="h5" className="selector-shop-item-title">
        {title}
      </Heading>

      <Heading tag="h5" className="selector-shop-item-subtitle">
        Доступные варианты
      </Heading>

      <div className="selector-shop-item-select">
        <ShopItem
          isSelected
          isPurchased
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
