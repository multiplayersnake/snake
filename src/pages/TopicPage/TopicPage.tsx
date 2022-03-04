import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Button, NavButton, Scroll, Heading, Message } from '../../components';

import { topic_arr } from './mock';

import { MessageType } from '../../types';
import { messagesAPI } from '../../api';
import { MessageModel } from '../../database/models';

// TODO переработать
import '../../components/common/TextArea/TextArea.css';
import './TopicPage.css';
import { getUserNickname, RootState, showModal } from '../../store';

export const TopicPage: FC = () => {
  const dispatch = useDispatch();

  const contentRef = useRef(null); // TODO избавиться от ref ?
  const userNickname = useSelector<RootState, string>(getUserNickname);

  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const readMessages = useCallback(async () => {
    const topicMessages = await messagesAPI.readMessages(topicId);
    setMessages(topicMessages);
  }, [topicId]);

  const createMessage = useCallback(async () => {
    const content = contentRef.current.value;

    await messagesAPI.createMessage({ content, author: userNickname, topic_id: topicId });

    contentRef.current.value = '';

    await readMessages();
  }, [readMessages, topicId, userNickname]);

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

  useEffect(() => {
    void readMessages();
  }, [topicId, readMessages]);

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
            {messages.map((message) => (
              <Message
                key={message.id}
                id={message.id}
                createdAt={message.createdAt}
                author={message.author}
                content={message.content}
                onDelete={deleteMessage}
                onSave={saveMessage}
              />
            ))}
            <br />
          </Scroll>
        </div>

        <div className="new-message">
          <Heading tag="h4">Новое сообщение:</Heading>

          <textarea ref={contentRef} className="text-area" />

          <Button onClick={createMessage}>Добавить сообщение</Button>
        </div>
      </div>
    </div>
  );
};
