import { RootState } from '../../types';

export function getModalMessage(state: RootState): string {
  return state.modal.message;
}

export function getModalVisible(state: RootState): boolean {
  return Boolean(state.modal.message);
}

export function getModalOnConfirm(state: RootState): () => void {
  return (
    state.modal.onConfirm ??
    (() => {
      /* empty function */
    })
  );
}

export function getModalCancelable(state: RootState): boolean {
  return Boolean(state.modal.onConfirm);
}
