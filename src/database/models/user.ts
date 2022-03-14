import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

import { WithTimeStamps } from '../../types';

export type UserModel = {
  id?: number;
  nick?: string;
};

export type UserWithTimeStamps = WithTimeStamps<UserModel>;

export const userModel: ModelAttributes<Model, UserModel> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nick: {
    type: DataType.STRING
  }
};
