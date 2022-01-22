import React, { FC, useEffect, useRef } from 'react';
import cn from 'classnames';

import './ShopItem.css';
import elSource from '../../assets/elexir.png';
import coinSource from '../../assets/coin.png';
import awardSource from '../../assets/award.png';

type ShopItemProps = {
  name: string;
  desc: string;
  isSelected: boolean;
  isPurchased: boolean;
  itemPrice: number;
  itemCondition: number;
  selectFunction: (partKey: number, ItemKey: number) => void;
  partKey: number;
  itemKey: number;
};

type ImgItemProps = {
  itemType: string;
};

const ImgItem: FC<ImgItemProps> = (props) => {
  const { itemType } = props;
  if (itemType === 'part') return null;
  return <img src={elSource} width={75} height={75} className={'img'} alt={'elixir'} />;
};

const ShopItemComponent: FC<ShopItemProps> = (props) => {
  const { isSelected, isPurchased, name, desc, itemPrice, itemCondition, selectFunction, partKey, itemKey } = props;
  const ref = useRef(null);
  const item = JSON.parse(desc);

  function SetSelectItem() {
    selectFunction(partKey, itemKey);
  }

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    ctx.clearRect(0, 0, 100, 100);

    if (item.type === 'part') {
      if (item.form === 'circle') {
        ctx.beginPath();
        ctx.arc(45, 35, 30, 0, 2 * Math.PI);
        ctx.fillStyle = item.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }, [item.color, item.form, item.type]);

  let cls = 'one-item';
  if (!isSelected) cls = cn('shop-item', cls);
  if (isPurchased) cls = cn('purchased-item', cls);

  let imgClass = 'img-shop-item';
  if (isPurchased) imgClass = cn(imgClass, 'img-shop-item-purchased');

  return (
    <div className={cls} onClick={SetSelectItem}>
      <canvas ref={ref} width={75} height={75} className={'img'} />
      <ImgItem itemType={item.type} />
      <div className={'price'}>{itemPrice}</div>
      <img src={coinSource} className={cn('coin', imgClass)} alt={'coin'} />
      <div className={'cond'}>{itemCondition}</div>
      <img src={awardSource} className={cn('award', imgClass)} alt={'award'} />
      <div className={'title'}>{name}</div>
    </div>
  );
};

export default ShopItemComponent;
