import React, { FC } from 'react';

import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Theme from '../../components/Theme';

import './ForumPage.css';
import cn from 'classnames';
import { out_arr } from './mock';

const ForumPage: FC = () => {
  return (
    <div className="forum-page">
      <Button className={cn('button', 'button-forum-back')}>В меню</Button>
      <Heading tag="h1" className={cn('title-forum')}>
        Форум
      </Heading>
      <div className={cn('themes-forum')}>
        {out_arr.map((value, index) => (
          <Theme
            key={index}
            datetime={value.datetime}
            author={value.author}
            mesCount={value.mesCount}
            newCount={value.newCount}
            content={value.content}
          />
        ))}
      </div>
      <div className={cn('new-forum')}>
        Новая тема:
        <input className={cn('input')} />
        Сообщение:
        <textarea className={cn('text-area', 'text-area-forum')} />
        <button className={cn('button', 'button-forum-new')}>Создать тему</button>
      </div>
    </div>
  );
};

export default ForumPage;
