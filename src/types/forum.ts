import { TopicModel, MessageModel } from '../database/models';
import { WithTimeStamps } from './common';

// TODO подумать, нужны ли эти типы ?

export type TopicType = WithTimeStamps<TopicModel>;
export type MessageType = WithTimeStamps<MessageModel>;
