import React, { FC, useEffect, useRef } from 'react';

import './ShopItem.css';
import cn from 'classnames';

import elSource from '../../assets/elexir.png';
import coinSource from '../../assets/coin.png';
import awardSource from '../../assets/award.png';

type ShopItemProps = {
  name: string;
  desc: string;
  isSelected: boolean;
  item_price: number;
  item_condition: number;
};

function GetImgPlace(itemType: any) {
  if (itemType.itemType === 'part') return <div />;
  return <img src={elSource} width={75} height={75} className={'img'} alt={''} />;
}

const ShopItemComponent: FC<ShopItemProps> = (props) => {
  const { isSelected, name, desc, item_price, item_condition } = props;
  const ref = useRef(null);
  const item = JSON.parse(desc);

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

  const cls = isSelected ? cn('one-item') : cn('one-item', 'shop_item');

  return (
    <div className={cls}>
      <canvas ref={ref} width={75} height={75} className={'img'} />
      <GetImgPlace itemType={item.type} />
      <div className={cn('price')}>{item_price}</div>
      <img src={coinSource} className={cn('coin', 'img-in-line')} alt={''} />
      <div className={cn('cond')}>{item_condition}</div>
      <img src={awardSource} className={cn('award', 'img-in-line')} alt={''} />
      <div className={cn('title')}>{name}</div>
    </div>
  );
};

export default ShopItemComponent;
