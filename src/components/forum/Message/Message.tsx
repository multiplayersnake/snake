import React, { FC, useCallback } from 'react';
import cn from 'classnames';

import './Message.css';

type MessageProps = {
  id: number;
  dateTime: string;
  author: string;
  content: string;
  deleteFunction: (id: number) => void;
};

export const Message: FC<MessageProps> = (props) => {
  const { id, dateTime, author, content, deleteFunction } = props;

  const deleteClick = useCallback(() => {
    deleteFunction(id);
  }, [id, deleteFunction]);

  return (
    <div className={cn('message', 'text-field')}>
      <div className={'message-author'}>
        {author} &nbsp;&nbsp; {dateTime}
      </div>
      <div className={'message-edit'}>
        <button className={'message-button'}>Edit</button>
      </div>
      <div className={'message-delete'}>
        <button className={'message-button'} onClick={deleteClick}>
          Delete
        </button>
      </div>
      <div className={cn('message-content', 'text-field')}>{content}</div>
    </div>
  );
};
