import React, { FC } from 'react';

import Button from '../../components/Button';

import './ForumPage.css';

const ForumPage: FC = () => {
  return (
    <div className="forum-page">
      <h1>Здесь будет форум...</h1>
      <h2>И мы начинаем разработку этой страницы</h2>
      <Button>OK</Button>
    </div>
  );
};

export default ForumPage;
