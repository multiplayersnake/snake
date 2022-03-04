import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { Button, Input, Form, Heading, Message, Topic, TextArea, InfoPanel, MainMenuItem } from '../components';
import { MenuActionType } from '../types';
import { configureStore } from '../store';

const { store } = configureStore();

it('Button', () => {
  const tree = renderer.create(<Button onClick={() => ''}>Test Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Form', () => {
  const tree = renderer.create(<Form onSubmit={() => ''}>Test Form</Form>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Message', () => {
  const tree = renderer
    .create(
      <Message
        id={0}
        content={''}
        author={''}
        createdAt={''}
        onDelete={() => {
          console.log(1);
        }}
        onSave={() => {
          console.log(1);
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Topic', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Topic id={1} newCount={1} href={''} mesCount={1} content={''} author={''} createdAt={''} />
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
  const tree = renderer
    .create(
      <Provider store={store}>
        <MainMenuItem item={item} onAction={() => ''} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('TextArea', () => {
  const tree = renderer.create(<TextArea label={'Test TextArea'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
