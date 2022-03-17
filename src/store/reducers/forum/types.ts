import { TopicType, MessageType } from '../../../types';
import { BaseAction } from '../../types';

export type ForumState = {
  messages: MessageType[];
  topics: TopicType[];
  topicContent: string;
};

export enum ForumActionType {
  SetTopics = 'SetTopics',
  SetTopicContent = 'SetTopicContent',
  SetMessages = 'SetMessages'
}

export type ForumActionPayload = MessageType[] | string;

export interface ForumAction extends BaseAction<ForumActionType> {
  payload?: ForumActionPayload;
}
