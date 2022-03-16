import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserId, RootState, getTopics, fetchTopics, createTopic, deleteTopic, updateTopic } from '../../store';
import { TopicModel } from '../../database/models';
import { Button, NavButton, Heading, Scroll, Topic } from '../../components';
import { TopicType } from '../../types';

import './ForumPage.css';

export const ForumPage: FC = () => {
  const dispatch = useDispatch();

  const contentRef = useRef(null);
  const userId = useSelector<RootState, number>(getUserId);
  const topics = useSelector<RootState, TopicType[]>(getTopics);

  const handleCreateTopic = useCallback(async () => {
    // TODO хорошо бы избавиться от ref и сделать обычную форму
    const content = contentRef.current.value;

    if (!content) return;

    dispatch(createTopic({ content, user_id: userId }));

    contentRef.current.value = '';
  }, [dispatch, userId]);

  const handleDeleteTopic = useCallback(
    (data: TopicModel) => {
      dispatch(deleteTopic(data));
    },
    [dispatch]
  );

  const handleSaveTopic = useCallback(
    (data: TopicModel) => {
      dispatch(updateTopic(data));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

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
                onDelete={handleDeleteTopic}
                onSave={handleSaveTopic}
              />
            ))}
            <br />
          </Scroll>
        </div>

        <div className="new-forum">
          <Heading tag="h4">Новая тема:</Heading>

          <input ref={contentRef} className="input" />

          <Button onClick={handleCreateTopic}>Создать тему</Button>
        </div>
      </div>
    </div>
  );
};
