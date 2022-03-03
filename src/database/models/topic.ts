import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export type TopicModel = {
  id: number;
  author: string;
  content: string;
};

export const topicModel: ModelAttributes<Model, TopicModel> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataType.STRING
  },
  content: {
    type: DataType.STRING
  }
};
