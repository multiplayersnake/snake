import { MessageType, TopicType } from '../../../types';
import { ForumAction, ForumActionType, ForumState } from './types';

const defaultForumState: ForumState = {
  topics: [],
  messages: [],
  topicContent: ''
};

export function forumReducer(state: ForumState = defaultForumState, action: ForumAction): ForumState {
  const { type, payload } = action;

  switch (type) {
    case ForumActionType.SetTopics:
      return { ...state, topics: payload as TopicType[] };

    case ForumActionType.SetMessages:
      return { ...state, messages: payload as MessageType[] };

    case ForumActionType.SetTopicContent:
      return { ...state, topicContent: payload as string };

    default:
      return state;
  }
}
