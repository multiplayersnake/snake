import React, { FC } from 'react';
import cn from 'classnames';

import './Theme.css';

type ThemeProps = {
  datetime: string;
  author: string;
  mesCount: number;
  newCount: number;
  content: string;
};

const Input: FC<ThemeProps> = (props) => {
  const { datetime, author, mesCount, newCount, content } = props;
  let newElement;

  if (newCount > 0) {
    newElement = <div className={cn('theme-newCount')}>Новых сообщений: {newCount}</div>;
  } else {
    newElement = <div className={cn('theme-newCount')}> </div>;
  }

  return (
    <div className={cn('theme')}>
      <div className={cn('theme-datetime')}>Создана: {datetime}</div>
      <div className={cn('theme-author')}>Автор: {author}</div>
      <div className={cn('theme-mesCount')}>Сообщений: {mesCount}</div>
      <div className={cn('theme-content')}>{content}</div>
      {newElement}
    </div>
  );
};

export default Input;
