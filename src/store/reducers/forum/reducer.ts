import { ForumAction, ForumActionType, ForumState } from './types';

const defaultForumState: ForumState = {
  messages: [],
  topics: []
};

export function forumReducer(state: ForumState = defaultForumState, action: ForumAction): ForumState {
  const { type, payload } = action;

  switch (type) {
    case ForumActionType.SetMessages:
      return { ...state, messages: payload };

    case ForumActionType.SetTopics:
      return { ...state, topics: payload };

    default:
      return state;
  }
}
