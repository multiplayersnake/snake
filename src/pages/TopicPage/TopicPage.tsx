import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Button, NavButton, Scroll, Heading, Message } from '../../components';

import { MessageType } from '../../types';
import { MessageModel } from '../../database/models';

import './TopicPage.css';
import { getUserId, RootState, showModal } from '../../store';
import { messagesAPI, topicsAPI } from '../../api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditorEvent from '@ckeditor/ckeditor5-utils/src/eventinfo';

export const TopicPage: FC = () => {
  const dispatch = useDispatch();

  const userId = useSelector<RootState, number>(getUserId);
  const [newMessageContent, setNewMessageContent] = useState('');

  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [title, setTitle] = useState('');

  const readTitle = useCallback(async () => {
    setTitle(await topicsAPI.readTitle(topicId));
  }, [topicId]);

  const readMessages = useCallback(async () => {
    const topicMessages = await messagesAPI.readMessages(topicId, userId);
    setMessages(topicMessages);
  }, [topicId, userId]);

  const createMessage = useCallback(async () => {
    await messagesAPI.createMessage({ content: newMessageContent, user_id: userId, topic_id: topicId });
    await readMessages();
    setNewMessageContent('');
  }, [newMessageContent, readMessages, topicId, userId]);

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

  const handleNewMessageChange = useCallback((event: EditorEvent, editor: ClassicEditor) => {
    setNewMessageContent(editor.getData());
  }, []);

  const saveMessage = useCallback(
    async (data: MessageModel) => {
      await messagesAPI.updateMessage(data);
      await readMessages();
    },
    [readMessages]
  );

  useEffect(() => {
    void readMessages();
    void readTitle();
  }, [topicId, readMessages, readTitle]);

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
          <Scroll title={title} mode="Last" id={`messages_${topicId}`}>
            {messages.map((message) => (
              <Message
                key={message.id}
                id={message.id}
                createdAt={message.createdAt}
                author={message.nick}
                authorId={message.user_id}
                currentUserId={userId}
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

          <div className="text-area">
            <CKEditor
              editor={ClassicEditor}
              data={newMessageContent}
              onChange={handleNewMessageChange}
              config={{
                toolbar: ['bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo']
              }}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle('height', '400px', editor.editing.view.document.getRoot());
                });
              }}
            />
          </div>

          <Button onClick={createMessage}>Добавить сообщение</Button>
        </div>
      </div>
    </div>
  );
};
