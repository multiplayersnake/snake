import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Button, NavButton, Scroll, Heading, Message } from '../../components';

import { topic_arr } from './mock';

import MessagesAPI from '../../api/MessagesAPI';
import { IMessage } from '../../database/models/message';

// TODO переработать
import '../../components/common/TextArea/TextArea.css';
import './MessagePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNickname, RootState, showModal } from '../../store';

export const MessagePage: FC = () => {
  const dispatch = useDispatch();

  const contentRef = useRef(null);
  const displayName = useSelector<RootState, string>(getUserNickname);
  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const readMessage = useCallback(() => {
    MessagesAPI.readMessage(topicId).then((result) => {
      setMessages(result);
    });
  }, [topicId]);

  useEffect(() => {
    readMessage();
  }, [topicId, readMessage]);

  const createNewMessage = () => {
    const content = contentRef.current.value;
    createMessage({ content: content, author: displayName, topic_id: topicId });
  };

  const createMessage = useCallback(
    (data: IMessage) => {
      MessagesAPI.createMessage(data).then(() => {
        contentRef.current.value = '';
        readMessage();
      });
    },
    [readMessage]
  );

  const deleteMessage = useCallback(
    (id: number) => {
      dispatch(
        showModal(`Вы уверены, что хотите удалить сообщение?`, () => {
          const data = { id: id };
          MessagesAPI.deleteMessage(data).then(() => {
            readMessage();
          });
        })
      );
    },
    [dispatch, readMessage]
  );

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
              <Message
                key={index}
                id={value.id}
                dateTime={' - '}
                author={value.author}
                content={value.content}
                deleteFunction={deleteMessage}
              />
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
