import React, { FC } from 'react';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './SignupPage.css';
import Heading from '../../components/Heading';
import Form from '../../components/Form';

const SignupPage: FC = () => {
  return (
    <div className="signup-page">
      <img className="logo" src={logo} alt={'logo'} />
      <Form>
        <Heading tag="h1">Регистрация</Heading>
        <Input label="Логин" name="login" />
        <Input label="Пароль" name="password" type="password" />
        <div className="login-page-buttons">
          <Button type="submit">Зарегистрироваться</Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupPage;
