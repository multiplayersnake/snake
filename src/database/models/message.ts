import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export type MessageType = {
  id?: number;
  topic_id?: number;
  author?: string;
  content?: string;
};

export const messageModel: ModelAttributes<Model, MessageType> = {
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
