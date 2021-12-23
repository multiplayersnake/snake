import React, { FC } from 'react';

import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Theme from '../../components/Theme';

import './ForumPage.css';
import cn from 'classnames';

const ForumPage: FC = () => {
  // Временный массив - заглушка. Эти данные должны приходить из API запроса.
  const out_arr = [];
  out_arr.push({
    id: 1,
    datetime: '01.09.2021',
    author: 'John1',
    mesCount: 15,
    newCount: 2,
    content: 'Чем управлять?'
  });
  out_arr.push({
    id: 2,
    datetime: '01.10.2021',
    author: 'John2',
    mesCount: 16,
    newCount: 0,
    content: 'Пожелания к разработчикам'
  });
  out_arr.push({
    id: 3,
    datetime: '01.11.2021',
    author: 'John3',
    mesCount: 17,
    newCount: 3,
    content: 'Какая скучная игра!'
  });
  out_arr.push({ id: 4, datetime: '01.12.2021', author: 'John4', mesCount: 18, newCount: 4, content: 'Конкурс!' });

  return (
    <div className="forum-page">
      <Button className={cn('button-forum-back')}>В меню</Button>
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
      <div className={cn('title', 'new-forum')}>Форум</div>
    </div>
  );
};

export default ForumPage;
