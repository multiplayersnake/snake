import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import './Topic.css';

type TopicProps = {
  dateTime: string;
  author: string;
  mesCount: number;
  newCount: number;
  content: string;
  id: number;
  href: string;
};

export const Topic: FC<TopicProps> = (props) => {
  const { dateTime, author, mesCount, newCount, content, href } = props;
  let newElem = '';
  if (newCount > 0) newElem = ` (новых ${newCount})`;

  const history = useHistory();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      history.push(href);
    },
    [history, href]
  );

  return (
    <a href={href} onClick={handleClick}>
      <div className={cn('topic', 'text-field')}>
        <div className={cn('topic-dateTime', 'text-field')}>
          Создана: <b>{dateTime}</b>
        </div>
        <div className={cn('topic-author', 'text-field')}>
          Автор: <b>{author}</b>
        </div>
        <div className={cn('topic-mes-count', 'text-field')}>
          Сообщений: {mesCount}
          <b>{newElem}</b>
        </div>
        <div className={cn('topic-content', 'text-field')}>{content}</div>
      </div>
    </a>
  );
};
