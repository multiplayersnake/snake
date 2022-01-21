import { UserState, UserAction, UserActionType } from './types';

const defaultState: UserState = {
  data: undefined
};

export function userReducer(state: UserState = defaultState, action: UserAction): UserState {
  const { type, payload } = action;

  switch (type) {
    case UserActionType.SetUser:
      return {
        ...state,
        data: payload
      };

    default:
      return state;
  }
}
