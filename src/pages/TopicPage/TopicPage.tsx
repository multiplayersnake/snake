import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditorEvent from '@ckeditor/ckeditor5-utils/src/eventinfo';

import { getUserId, RootState, getTopic, fetchTopic, createMessage, updateMessage, deleteMessage } from '../../store';
import { Button, NavButton, Scroll, Heading, Message } from '../../components';
import { TopicType } from '../../types';
import { MessageModel } from '../../database/models';

import './TopicPage.css';

export const TopicPage: FC = () => {
  const dispatch = useDispatch();

  const userId = useSelector<RootState, number>(getUserId);
  const [newMessageContent, setNewMessageContent] = useState('');

  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id);

  const { messages, content } = useSelector<RootState, TopicType>(getTopic);

  const handleMessageCreate = useCallback(async () => {
    dispatch(createMessage({ content: newMessageContent, user_id: userId, topic_id: topicId }));
    setNewMessageContent('');
  }, [dispatch, newMessageContent, topicId, userId]);

  const handleMessageDelete = useCallback(
    (data: MessageModel) => {
      dispatch(deleteMessage({ id: data.id, topic_id: topicId }));
    },
    [dispatch, topicId]
  );

  const handleNewMessageChange = useCallback((event: EditorEvent, editor: ClassicEditor) => {
    setNewMessageContent(editor.getData());
  }, []);

  const handleMessageSave = useCallback(
    async (data: MessageModel) => {
      dispatch(updateMessage({ ...data, topic_id: topicId }));
    },
    [dispatch, topicId]
  );

  useEffect(() => {
    dispatch(fetchTopic(topicId));
  }, [dispatch, topicId]);

  return (
    <div className="topic-page">
      <NavButton className="button-forum-back" to="/topics">
        К темам
      </NavButton>

      <Heading tag="h1" className="title-message">
        Форум
      </Heading>

      <div className="messages-forum">
        <div className="messages-list">
          <Scroll title={content} mode="Last" id={`messages_${topicId}`}>
            {messages.map((message) => (
              <Message
                key={message.id}
                id={message.id}
                createdAt={message.createdAt}
                author={message.nick}
                authorId={message.user_id}
                currentUserId={userId}
                content={message.content}
                onDelete={handleMessageDelete}
                onSave={handleMessageSave}
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

          <Button onClick={handleMessageCreate}>Добавить сообщение</Button>
        </div>
      </div>
    </div>
  );
};
