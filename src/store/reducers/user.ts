type LoadStatus = 'success' | 'pending' | 'failed';
type Actions = 'PENDING' | 'SUCCESS' | 'FAILED' | 'SET_USER_ITEM';
type Nullable<T> = T | null;

interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

type UserState = {
  item: Nullable<User>;
  status: LoadStatus;
};

const actions = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  SET_USER_ITEM: 'SET_USER_ITEM'
};

const defaultState: UserState = {
  status: 'failed',
  item: null
};

interface BaseActionType<T> {
  type: T;
}

// Может иногда совпадать с Reducer-типом
interface ItemActionType extends BaseActionType<Actions> {
  item: User;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function userReducer(state: UserState = defaultState, { type, item }: ItemActionType = {}): UserState {
  switch (type) {
    case actions.PENDING:
      return {
        ...state,
        status: 'pending'
      };
    case actions.SUCCESS:
      return {
        ...state,
        status: 'success'
      };
    case actions.FAILED:
      return {
        ...state,
        status: 'failed'
      };
    case actions.SET_USER_ITEM:
      return {
        ...state,
        status: 'success',
        item
      };
    default:
      return state;
  }
}

export function loadSuccess(): BaseActionType<Actions> {
  return { type: 'SUCCESS' };
}
export function loadFailed(): BaseActionType<Actions> {
  return { type: 'FAILED' };
}
export function loadPending(): BaseActionType<Actions> {
  return { type: 'PENDING' };
}

export function setUser(user: User): ItemActionType {
  return { type: 'SET_USER_ITEM', item: user };
}
