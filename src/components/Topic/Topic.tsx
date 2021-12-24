import React, { FC } from 'react';
import cn from 'classnames';

import './Topic.css';

type TopicProps = {
  datetime: string;
  author: string;
  mesCount: number;
  newCount: number;
  content: string;
};

const Topic: FC<TopicProps> = (props) => {
  const { datetime, author, mesCount, newCount, content } = props;

  return (
    <div className={cn('topic')}>
      <div className={cn('topic-datetime')}>Создана: {datetime}</div>
      <div className={cn('topic-author')}>Автор: {author}</div>
      <div className={cn('topic-mesCount')}>Сообщений: {mesCount}</div>
      <div className={cn('topic-content')}>{content}</div>
      {newCount > 0 && <div className={cn('topic-newCount')}>{`Новых сообщений: ${newCount}`}</div>}
    </div>
  );
};

export default Topic;
