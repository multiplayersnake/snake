type Actions = 'SHOW_CONFIRM' | 'HIDE_CONFIRM';

const actions = {
  SHOW_CONFIRM: 'SHOW_CONFIRM',
  HIDE_CONFIRM: 'HIDE_CONFIRM'
};

type ConfirmState = {
  message: string;
  isVisible: boolean;
  yesFunction: () => void;
};

const defaultState: ConfirmState = {
  message: '',
  isVisible: false,
  yesFunction: null
};

interface BaseActionType<T> {
  type: T;
}

interface ItemActionType extends BaseActionType<Actions> {
  message: string;
  isVisible: boolean;
  yesFunction: () => void;
}

export function confirmReducer(
  state: ConfirmState = defaultState,
  { type, message, yesFunction }: ItemActionType
): ConfirmState {
  switch (type) {
    case actions.SHOW_CONFIRM:
      return {
        ...state,
        message,
        isVisible: true,
        yesFunction: yesFunction
      };
    case actions.HIDE_CONFIRM:
      return {
        ...state,
        message,
        isVisible: false,
        yesFunction: null
      };
    default:
      return state;
  }
}

export function showConfirm(message: string, yesFunction: () => void): ItemActionType {
  return { type: 'SHOW_CONFIRM', message: message, isVisible: true, yesFunction: yesFunction };
}

export function hideConfirm(): ItemActionType {
  return { type: 'HIDE_CONFIRM', message: '', isVisible: false, yesFunction: null };
}
