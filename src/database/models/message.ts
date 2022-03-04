import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

import { WithTimeStamps } from '../../types';

export type MessageModel = {
  id?: number;
  topic_id?: number;
  author?: string;
  content?: string;
};

export type MessageWithTimeStamps = WithTimeStamps<MessageModel>;

export const messageModel: ModelAttributes<Model, MessageModel> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  topic_id: {
    type: DataType.INTEGER,
    allowNull: false
  },
  author: {
    type: DataType.STRING
  },
  content: {
    type: DataType.STRING
  }
};
