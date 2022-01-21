import { RootState } from '../../types';

export function getModalMessage(state: RootState): string {
  return state.modal.message;
}

// Селектор возвращает признак видимости модального окна,
// в данном случае, он опирается на наличие текста сообщения.
// Эта логика может поменяться, но внутри компонента нас это не беспокоит - мы просто проверяем значение на true/false
export function getModalVisible(state: RootState): boolean {
  return Boolean(state.modal.message);
}

// Если есть обработчик onConfirm - возвращаем его,
// иначе возвращаем пустую функцию, чтобы делать эту проверку каждый раз, когда нам потенциально нужно вызвать эту функцию в компоненте
export function getModalOnConfirm(state: RootState): () => void {
  return (
    state.modal.onConfirm ??
    (() => {
      /* empty function */
    })
  );
}

// Если есть обработчик onConfirm - то показываем две кнопки: "Да" и "Нет",
// иначе показываем только кнопку "ОК"
export function getModalCancelable(state: RootState): boolean {
  return Boolean(state.modal.onConfirm);
}
