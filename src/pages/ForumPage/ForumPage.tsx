import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, NavButton, Heading, Scroll, Topic } from '../../components';
import { TopicType } from '../../types';
import { topicsAPI } from '../../api';

// TODO переработать
import './ForumPage.css';

import { getUserId, RootState, showModal } from '../../store';
import { TopicModel } from '../../database/models';

export const ForumPage: FC = () => {
  const dispatch = useDispatch();

  const contentRef = useRef(null);
  const userId = useSelector<RootState, number>(getUserId);

  const [topics, setTopics] = useState<TopicType[]>([]);

  // TODO перенести работу с API в redux
  const readTopics = useCallback(async () => {
    const allTopics = await topicsAPI.readTopics(userId);
    setTopics(allTopics);
  }, [userId]);

  const createTopic = useCallback(async () => {
    const content = contentRef.current.value;

    await topicsAPI.createTopic({ content, user_id: userId });

    contentRef.current.value = '';

    await readTopics();
  }, [readTopics, userId]);

  const deleteTopic = useCallback(
    (data: TopicModel) => {
      dispatch(
        showModal(`Вы уверены, что хотите удалить топик?`, async () => {
          await topicsAPI.deleteTopic(data);
          await readTopics();
        })
      );
    },
    [dispatch, readTopics]
  );

  const saveTopic = useCallback(
    async (data: TopicModel) => {
      await topicsAPI.updateTopic(data);
      await readTopics();
    },
    [readTopics]
  );

  useEffect(() => {
    void readTopics();
  }, [readTopics]);

  return (
    <div className="forum-page">
      <NavButton className="button-forum-back" to="/main">
        В меню
      </NavButton>

      <Heading tag="h1" className="title-forum">
        Форум
      </Heading>

      <div className="topics-forum">
        <div className="topics-list">
          <Scroll title="Темы" mode="First" id="topics">
            {topics.map((topic) => (
              <Topic
                key={topic.id}
                id={topic.id}
                createdAt={topic.createdAt}
                author={topic.nick}
                authorId={topic.user_id}
                currentUserId={userId}
                mesCount={topic.mes_count}
                newCount={topic.new_count}
                content={topic.content}
                href={`/topics/${topic.id}`}
                onDelete={deleteTopic}
                onSave={saveTopic}
              />
            ))}
            <br />
          </Scroll>
        </div>

        <div className="new-forum">
          <Heading tag="h4">Новая тема:</Heading>

          <input ref={contentRef} className="input" />

          <Button onClick={createTopic}>Создать тему</Button>
        </div>
      </div>
    </div>
  );
};
