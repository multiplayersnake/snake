import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, NavButton, Heading, Scroll, Topic } from '../../components';
import { TopicType } from '../../types';
import { messagesAPI, topicsAPI } from '../../api';
// import { TopicWithTimeStamps } from '../../database/models';

// TODO переработать
import '../../components/common/TextArea/TextArea.css';
import './ForumPage.css';

import { getUserNickname, RootState, showModal } from '../../store';
import { TopicModel } from '../../database/models';

export const ForumPage: FC = () => {
  const dispatch = useDispatch();

  const contentRef = useRef(null);
  const userNickname = useSelector<RootState, string>(getUserNickname);

  const [topics, setTopics] = useState<TopicType[]>([]);

  const readTopics = useCallback(async () => {
    const allTopics = await topicsAPI.readTopics();
    setTopics(allTopics);
  }, []);

  const createTopic = useCallback(async () => {
    const content = contentRef.current.value;

    // TODO не правильней ли сохранять ID юзера вместо ника?
    await topicsAPI.createTopic({ content, author: userNickname });

    contentRef.current.value = '';

    await readTopics();
  }, [readTopics, userNickname]);

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
                author={topic.author}
                mesCount={'TODO как узнать сколько сообщений в топике?' && 42}
                newCount={'TODO как понять сколько новых сообщений?' && 24}
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
