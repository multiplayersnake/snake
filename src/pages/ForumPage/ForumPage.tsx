import React, { FC } from 'react';

import Button from '../../components/Button';

import './ForumPage.css';
import cn from 'classnames';

const ForumPage: FC = () => {
  return (
    <div className="forum-page">
      <Button className={cn('button-forum-back')}>В меню</Button>
      <div className={cn('title', 'title-forum')}>Форум</div>
      <div className={cn('title', 'themes-forum')}>Форум</div>
      <div className={cn('title', 'new-forum')}>Форум</div>
    </div>
  );
};

export default ForumPage;
