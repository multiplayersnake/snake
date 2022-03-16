import { RootState } from '../../types';
import { TopicType, MessageType } from '../../../types';

export function getTopics(state: RootState): TopicType[] {
  return state.forum.topics;
}

export function getMessages(state: RootState): MessageType[] {
  return state.forum.messages;
}
