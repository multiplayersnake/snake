import { Dispatch } from 'redux';

import { MessageType, TopicType } from '../../../types';
import { GetState } from '../../types';
import { ForumActionType, ForumAction } from './types';

import { topicsAPI, messagesAPI } from '../../../api';
import { getUser } from '../user';

export function setMessages(messages: MessageType[]): ForumAction {
  return {
    type: ForumActionType.SetMessages,
    payload: messages
  };
}

export function setTopics(topics: TopicType[]): ForumAction {
  return {
    type: ForumActionType.SetMessages,
    payload: topics
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

export function fetchMessages(topicId: number) {
  return async function fetchMessagesThunk(dispatch: Dispatch, getState: GetState) {
    const state = getState();
    const user = getUser(state);
    const messages = await messagesAPI.readMessages(topicId, user.id);

    dispatch(setMessages(messages));
  };
}
