import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './Topic.css';

type TopicProps = {
  datetime: string;
  author: string;
  mesCount: number;
  newCount: number;
  content: string;
  id: number;
  href: string;
};

const Topic: FC<TopicProps> = (props) => {
  const { datetime, author, mesCount, newCount, content, href } = props;
  let newElem = '';
  if (newCount > 0) newElem = ` (новых ${newCount})`;

  const navigate = useNavigate();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(href);
    },
    [navigate, href]
  );

  return (
    <a href={href} onClick={handleClick}>
      <div className={cn('topic', 'text-field')}>
        <div className={cn('topic-datetime', 'text-field')}>
          Создана: <b>{datetime}</b>
        </div>
        <div className={cn('topic-author', 'text-field')}>
          Автор: <b>{author}</b>
        </div>
        <div className={cn('topic-mesCount', 'text-field')}>
          Сообщений: {mesCount}
          <b>{newElem}</b>
        </div>
        <div className={cn('topic-content', 'text-field')}>{content}</div>
      </div>
    </a>
  );
};

export default Topic;
