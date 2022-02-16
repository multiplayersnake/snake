import { SsrState } from '../../types';

export function getModalMessage(state: SsrState): string {
  return state.modal.message;
}

export function getModalVisible(state: SsrState): boolean {
  return Boolean(state.modal.message);
}

export function getModalOnConfirm(state: SsrState): () => void {
  return (
    state.modal.onConfirm ??
    (() => {
      /* empty function */
    })
  );
}

export function getModalCancelable(state: SsrState): boolean {
  return Boolean(state.modal.onConfirm);
}
