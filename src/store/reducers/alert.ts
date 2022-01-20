type Actions = 'SHOW_ALERT' | 'HIDE_ALERT';

const actions = {
  SHOW_ALERT: 'SHOW_ALERT',
  HIDE_ALERT: 'HIDE_ALERT'
};

type AlertState = {
  message: string;
  isVisible: boolean;
};

const defaultState: AlertState = {
  message: '',
  isVisible: false
};

interface BaseActionType<T> {
  type: T;
}

interface ItemActionType extends BaseActionType<Actions> {
  message: string;
  isVisible: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function alertReducer(state: AlertState = defaultState, { type, message }: ItemActionType = {}): AlertState {
  switch (type) {
    case actions.SHOW_ALERT:
      return {
        ...state,
        message,
        isVisible: true
      };
    case actions.HIDE_ALERT:
      return {
        ...state,
        isVisible: false
      };
    default:
      return state;
  }
}

export function showAlert(message: string): ItemActionType {
  return { type: 'SHOW_ALERT', message: message, isVisible: true };
}

export function hideAlert(): ItemActionType {
  return { type: 'HIDE_ALERT', message: '', isVisible: false };
}
