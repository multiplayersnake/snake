import React, { FC } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';

import './SignupPage.css';

const SignupPage: FC = () => {
  return (
    <div className="signup-page">
      <h1>Здесь будет страница регистрации...</h1>
      <Button>Зарегистрироваться</Button>
    </div>
  );
};

export default SignupPage;
