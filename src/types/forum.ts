import { TopicModel, MessageModel } from '../database/models';
import { WithTimeStamps } from './common';

export type MessageType = WithTimeStamps<MessageModel> & {
  nick?: string;
};

export type TopicType = WithTimeStamps<TopicModel> & {
  nick?: string;
  mes_count?: number;
  new_count?: number;
  messages?: MessageType[];
};
