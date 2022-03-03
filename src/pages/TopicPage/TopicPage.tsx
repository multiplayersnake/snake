import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Button, NavButton, Scroll, Heading, Message } from '../../components';

import { topic_arr } from './mock';

import { messagesAPI } from '../../api';
import { MessageModel } from '../../database/models/message';

// TODO переработать
import '../../components/common/TextArea/TextArea.css';
import './TopicPage.css';
import { getUserNickname, RootState, showModal } from '../../store';

export const TopicPage: FC = () => {
  const dispatch = useDispatch();

  const contentRef = useRef(null); // TODO избавиться от ref ?
  const displayName = useSelector<RootState, string>(getUserNickname);

  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id);

  const [messages, setMessages] = useState<MessageModel[]>([]);

  const readMessages = useCallback(async () => {
    const topicMessages = await messagesAPI.readMessages(topicId);
    setMessages(topicMessages);
  }, [topicId]);

  useEffect(() => {
    void readMessages();
  }, [topicId, readMessages]);

  const createNewMessage = () => {
    const content = contentRef.current.value;
    void createMessage({ content, author: displayName, topic_id: topicId });
  };

  const createMessage = useCallback(
    async (data: MessageModel) => {
      await messagesAPI.createMessage(data);

      contentRef.current.value = '';

      await readMessages();
    },
    [readMessages]
  );

  const deleteMessage = useCallback(
    (data: MessageModel) => {
      dispatch(
        showModal(`Вы уверены, что хотите удалить сообщение?`, async () => {
          await messagesAPI.deleteMessage(data);
          await readMessages();
        })
      );
    },
    [dispatch, readMessages]
  );

  const saveMessage = useCallback(
    async (data: MessageModel) => {
      await messagesAPI.updateMessage(data);
      await readMessages();
    },
    [readMessages]
  );

  return (
    <div className="topic-page">
      <NavButton className={cn('button', 'button-forum-back')} to="/topics">
        К темам
      </NavButton>

      <Heading tag="h1" className="title-message">
        Форум
      </Heading>

      <div className="messages-forum">
        <div className="messages-list">
          <Scroll title={`${topic_arr[topicId].content}`} mode="Last" id={`messages_${topicId}`}>
            {messages.map((value, index) => (
              <Message
                key={index}
                id={value.id}
                dateTime={' - '}
                author={value.author}
                content={value.content}
                deleteFunction={deleteMessage}
                saveFunction={saveMessage}
              />
            ))}
            <br />
          </Scroll>
        </div>

        <div className="new-message">
          <Heading tag="h4">Новое сообщение:</Heading>

          <textarea ref={contentRef} className="text-area" />

          <Button onClick={createNewMessage}>Добавить сообщение</Button>
        </div>
      </div>
    </div>
  );
};
