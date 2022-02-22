import React, { FC, useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { formatDateTime } from '../../utils';
import { Button, NavButton, Scroll, Heading, Message } from '../../components';

import { out_arr } from './mock';
import { topic_arr } from './mock';

// TODO переработать
import '../../components/common/TextArea/TextArea.css';
import './MessagePage.css';
import MessagesAPI from '../../api/MessagesAPI';
import { IMessage } from '../../models/message';

export const MessagePage: FC = () => {
  const contentRef = useRef(null);

  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id);

  const [messages, setMessages] = useState(out_arr[topicId]);

  const createNewMessage = () => {
    const dateTime = formatDateTime(new Date());
    const content = contentRef.current.value;
    contentRef.current.value = '';
    // setMessages(messages.concat([{ dateTime, author: 'Текущий пользователь', content }]));

    setMessage({ content: content, author: 'Текущий пользователь', topic_id: topicId });
    getMessages();
  };

  const getMessages = useCallback(() => {
    MessagesAPI.getMessages(topicId).then((result) => {
      console.log(result);
    });
  }, [topicId]);

  const setMessage = useCallback((data: IMessage) => {
    MessagesAPI.setMessage(data).then((result) => {
      console.log(result);
    });
  }, []);

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
          <Heading tag="h4">Новое сообщение:</Heading>
          <textarea ref={contentRef} className={cn('text-area')} />
          <Button onClick={createNewMessage}> Добавить сообщение </Button>
        </div>
      </div>
    </div>
  );
};
