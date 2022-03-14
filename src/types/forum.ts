import { TopicModel, MessageModel } from '../database/models';
import { WithTimeStamps } from './common';

// TODO подумать, нужны ли эти типы ?

export type TopicType = WithTimeStamps<TopicModel> & {
  nick?: string;
  mes_count?: number;
  new_count?: number;
};

export type MessageType = WithTimeStamps<MessageModel> & {
  nick?: string;
};
