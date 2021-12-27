import React, { FC } from 'react';

import Button from '../../components/Button';

import './ProfilePage.css';

const ProfilePage: FC = () => {
  return (
    <div className="profile-page">
      <h1>Здесь будет профиль...</h1>
      <Button>OK</Button>
    </div>
  );
};

export default ProfilePage;
