import React, { FC, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { formatDateTime } from '../../utils';

import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Message from '../../components/Message';
import Scroll from '../../components/Scroll';

import './MessagePage.css';
import '../../components/TextArea/TextArea.css';
import { out_arr } from './mock';
import { topic_arr } from './mock';
import NavButton from '../../components/Button/NavButton';

const ForumPage: FC = () => {
  const contentRef = useRef(null);
  const [searchParams] = useSearchParams();
  const topicId: number = parseInt(searchParams.get('id'));
  const [messages, setMessages] = useState(out_arr[topicId]);

  const createNewMessage = () => {
    const datetime = formatDateTime(new Date());
    const content = contentRef.current.value;
    contentRef.current.value = '';
    setMessages(messages.concat([{ datetime, author: 'Текущий пользователь', content }]));
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
          <Scroll title={`${topic_arr[topicId].content}`} mode={'Last'}>
            {messages.map((value, index) => (
              <Message key={index} datetime={value.datetime} author={value.author} content={value.content} />
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