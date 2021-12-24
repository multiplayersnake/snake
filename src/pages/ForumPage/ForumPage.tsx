import React, { FC, useRef, useState } from 'react';
import cn from 'classnames';

import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Topic from '../../components/Topic';

import './ForumPage.css';
import { out_arr } from './mock';

function formatDateTime(val: Date) {
  const tmp = [
    '0' + val.getDate(),
    '0' + (val.getMonth() + 1),
    '' + val.getFullYear(),
    '0' + val.getHours(),
    '0' + val.getMinutes()
  ].map((component) => component.slice(-2)); // взять последние 2 цифры из каждой компоненты
  return tmp.slice(0, 3).join('.') + ' ' + tmp.slice(3).join(':');
}

const ForumPage: FC = () => {
  const contentRef = useRef(null);
  const [topics, setTopics] = useState(out_arr);

  const createNewTopic = () => {
    const id = topics.length;
    const datetime = formatDateTime(new Date());
    const content = contentRef.current.value;
    setTopics([{ id, datetime, author: 'Текущий пользователь', mesCount: 1, newCount: 0, content }].concat(topics));
  };

  return (
    <div className="forum-page">
      <Button className={cn('button', 'button-forum-back')}>В меню</Button>
      <Heading tag="h1" className={cn('title-forum')}>
        Форум
      </Heading>
      <div className={cn('topics-forum')}>
        {topics.map((value, index) => (
          <Topic
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
        <input ref={contentRef} className={cn('input')} />
        Сообщение:
        <textarea className={cn('text-area', 'text-area-forum')} />
        <button onClick={createNewTopic} className={cn('button', 'button-forum-new')}>
          Создать тему
        </button>
      </div>
    </div>
  );
};

export default ForumPage;
