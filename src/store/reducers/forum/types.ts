import { TopicType, MessageType } from '../../../types';
import { BaseAction } from '../../types';

export type ForumState = {
  messages: MessageType[];
  topics: TopicType[];
};

export enum ForumActionType {
  SetMessages = 'SetMessages',
  SetTopics = 'SetTopics'
}

export type ForumActionPayload = MessageType[];

export interface ForumAction extends BaseAction<ForumActionType> {
  payload?: ForumActionPayload;
}
