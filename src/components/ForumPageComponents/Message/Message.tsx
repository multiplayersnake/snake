import React, { FC } from 'react';
import cn from 'classnames';

import './Message.css';

type MessageProps = {
  dateTime: string;
  author: string;
  content: string;
};

const Message: FC<MessageProps> = (props) => {
  const { dateTime, author, content } = props;

  return (
    <div className={cn('message', 'text-field')}>
      <div className={cn('message-author')}>
        {author} &nbsp;&nbsp; {dateTime}
      </div>
      <div className={cn('message-content', 'text-field')}>{content}</div>
    </div>
  );
};

export default Message;
