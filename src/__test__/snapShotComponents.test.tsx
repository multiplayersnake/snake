import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { Button, Input } from '../components';
import Heading from '../components/Heading';
import TextArea from '../components/TextArea';
import Form from '../components/Form';
import Message from '../components/ForumPageComponents/Message';
import Topic from '../components/ForumPageComponents/Topic';
import InfoPanel from '../components/MainPageComponents/InfoPanel';
import MainMenuItem from '../components/MainPageComponents/MainMenuItem';

import { MenuActionType } from '../types';

import { store } from '../store';

it('Button', () => {
  const tree = renderer.create(<Button onClick={() => ''}>Test Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Form', () => {
  const tree = renderer.create(<Form onSubmit={() => ''}>Test Form</Form>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Message', () => {
  const tree = renderer.create(<Message content={''} author={''} dateTime={''} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Topic', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Topic id={1} newCount={1} href={''} mesCount={1} content={''} author={''} dateTime={''} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Input', () => {
  const tree = renderer.create(<Input label={'Input'} onChange={() => ''} onClick={() => ''} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Heading', () => {
  const tree = renderer.create(<Heading tag={'h1'}>Test Heading</Heading>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('InfoPanel', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <InfoPanel />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('MainMenuItem', () => {
  const action: MenuActionType = MenuActionType.Login;
  const item = { title: '', action: action, path: '', authorizedOnly: true };
  const tree = renderer.create(<MainMenuItem item={item} onAction={() => ''} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('TextArea', () => {
  const tree = renderer.create(<TextArea label={'Test TextArea'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
