import React, { FC, useRef, useState } from 'react';
import cn from 'classnames';

import { formatDateTime } from '../../utils';
import { Button, NavButton, Heading, Scroll, Topic } from '../../components';

import { out_arr } from './mock';

// TODO переработать
import '../../components/common/TextArea/TextArea.css';
import './ForumPage.css';

export const ForumPage: FC = () => {
  const contentRef = useRef(null);
  const messageRef = useRef(null);
  const [topics, setTopics] = useState(out_arr);

  const createNewTopic = () => {
    const id = topics.length;
    const dateTime = formatDateTime(new Date());
    const content = contentRef.current.value;
    contentRef.current.value = '';
    messageRef.current.value = '';
    setTopics([{ id, dateTime, author: 'Текущий пользователь', mesCount: 1, newCount: 0, content }].concat(topics));
  };

  return (
    <div className="forum-page">
      <NavButton className={cn('button', 'button-forum-back')} to={'/main'}>
        В меню
      </NavButton>
      <Heading tag="h1" className={cn('title-forum')}>
        Форум
      </Heading>
      <div className={cn('topics-forum')}>
        <div className={cn('topics-list')}>
          <Scroll title={'Темы'} mode={'First'} id={'topics'}>
            {topics.map((value, index) => (
              <Topic
                key={index}
                id={value.id}
                dateTime={value.dateTime}
                author={value.author}
                mesCount={value.mesCount}
                newCount={value.newCount}
                content={value.content}
                href={`/message/${value.id}`}
              />
            ))}
            <br />
          </Scroll>
        </div>
        <div className={cn('new-forum')}>
          <Heading tag="h4">Новая тема:</Heading>
          <input ref={contentRef} className={cn('input')} />
          <Heading tag="h4">Сообщение:</Heading>
          <textarea ref={messageRef} className={cn('text-area')} />
          <Button onClick={createNewTopic}> Создать тему </Button>
        </div>
      </div>
    </div>
  );
};
