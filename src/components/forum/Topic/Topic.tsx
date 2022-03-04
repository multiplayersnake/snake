import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { formatDateTime } from '../../../utils';

import './Topic.css';

type TopicProps = {
  createdAt: string;
  author: string;
  mesCount: number;
  newCount: number;
  content: string;
  id: number;
  href: string;
};

export const Topic: FC<TopicProps> = (props) => {
  const { createdAt, author, mesCount, newCount, content, href } = props;
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
      <div className="topic text-field">
        <div className="topic-dateTime text-field">
          Создана: <b>{formatDateTime(createdAt)}</b>
        </div>

        <div className={cn('topic-author', 'text-field')}>
          Автор: <b>{author}</b>
        </div>

        <div className="topic-mes-count text-field">
          Сообщений: {mesCount}
          <b>{newElem}</b>
        </div>

        <div className="topic-content text-field">{content}</div>
      </div>
    </a>
  );
};
