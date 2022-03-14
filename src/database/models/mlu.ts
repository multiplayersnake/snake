import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

import { WithTimeStamps } from '../../types';

export type MluModel = {
  mess_id?: number;
  user_id?: number;
};

export type MluWithTimeStamps = WithTimeStamps<MluModel>;

export const mluModel: ModelAttributes<Model, MluModel> = {
  mess_id: {
    type: DataType.INTEGER
  },
  user_id: {
    type: DataType.INTEGER
  }
};
