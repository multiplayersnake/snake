import React, { FC, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { formatDateTime } from '../../utils';
import { Button, NavButton, Scroll, Heading } from '../../components';
import Message from '../../components/ForumPageComponents/Message';

import { out_arr } from './mock';
import { topic_arr } from './mock';

// TODO переработать
import '../../components/TextArea/TextArea.css';
import './MessagePage.css';

const ForumPage: FC = () => {
  const contentRef = useRef(null);
  const [searchParams] = useSearchParams();
  const topicId: number = parseInt(searchParams.get('id'));
  const [messages, setMessages] = useState(out_arr[topicId]);

  const createNewMessage = () => {
    const dateTime = formatDateTime(new Date());
    const content = contentRef.current.value;
    contentRef.current.value = '';
    setMessages(messages.concat([{ dateTime, author: 'Текущий пользователь', content }]));
  };

  return (
    <div className="message-page">
      <NavButton className={cn('button', 'button-forum-back')} to={'/forum'}>
        К темам
      </NavButton>
      <Heading tag="h1" className={cn('title-message')}>
        Форум
      </Heading>
      <div className={cn('messages-forum')}>
        <div className={cn('messages-list')}>
          <Scroll title={`${topic_arr[topicId].content}`} mode={'Last'} id={`messages_${topicId}`}>
            {messages.map((value, index) => (
              <Message key={index} dateTime={value.dateTime} author={value.author} content={value.content} />
            ))}
            <br />
          </Scroll>
        </div>
        <div className={cn('new-message')}>
          <Heading className={cn('h4')}>Новое сообщение:</Heading>
          <textarea ref={contentRef} className={cn('text-area')} />
          <Button onClick={createNewMessage}> Добавить сообщение </Button>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
