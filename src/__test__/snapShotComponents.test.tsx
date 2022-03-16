import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Form } from '../components/common/Form';
import { Heading } from '../components/common/Heading';
import { Message } from '../components/forum/Message';
import { Topic } from '../components/forum/Topic';
import { TextArea } from '../components/common/TextArea';
import { InfoPanel } from '../components/main/InfoPanel';

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
        authorId={0}
        currentUserId={0}
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
        <Topic
          id={1}
          newCount={1}
          href={''}
          mesCount={1}
          content={''}
          author={'0'}
          createdAt={''}
          onDelete={() => {
            console.log(1);
          }}
          onSave={() => {
            console.log(1);
          }}
          authorId={0}
          currentUserId={0}
        />
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

it('TextArea', () => {
  const tree = renderer.create(<TextArea label={'Test TextArea'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
