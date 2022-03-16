import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { TopicModel } from '../../../database/models';
import { MessageType, TopicType } from '../../../types';
import { GetState, RootState } from '../../types';
import { ForumActionType, ForumAction } from './types';

import { topicsAPI, messagesAPI } from '../../../api';
import { getUser } from '../user';
import { showModal } from '../modal';

export function setTopics(topics: TopicType[]): ForumAction {
  return {
    type: ForumActionType.SetTopics,
    payload: topics
  };
}

export function setMessages(messages: MessageType[]): ForumAction {
  return {
    type: ForumActionType.SetMessages,
    payload: messages
  };
}

export function fetchTopics() {
  return async function fetchTopicsThunk(dispatch: Dispatch, getState: GetState) {
    const state = getState();
    const user = getUser(state);
    const topics = await topicsAPI.readTopics(user.id);

    dispatch(setTopics(topics));
  };
}

export function createTopic(data: TopicModel) {
  return async function createTopicThunk(dispatch: ThunkDispatch<RootState, void, AnyAction>) {
    await topicsAPI.createTopic(data);

    await dispatch(fetchTopics());
  };
}

export function updateTopic(data: TopicModel) {
  return async function deleteTopicThunk(dispatch: ThunkDispatch<RootState, void, AnyAction>) {
    await topicsAPI.updateTopic(data);
    await dispatch(fetchTopics());
  };
}

export function deleteTopic(data: TopicModel) {
  return async function deleteTopicThunk(dispatch: ThunkDispatch<RootState, void, AnyAction>) {
    await dispatch(
      showModal(`Вы уверены, что хотите удалить топик?`, async () => {
        await topicsAPI.deleteTopic(data);
        await dispatch(fetchTopics());
      })
    );
  };
}

export function fetchMessages(topicId: number) {
  return async function fetchMessagesThunk(dispatch: Dispatch, getState: GetState) {
    const state = getState();
    const user = getUser(state);
    const messages = await messagesAPI.readMessages(topicId, user.id);

    dispatch(setMessages(messages));
  };
}
