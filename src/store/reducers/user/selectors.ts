import { GameParameters, GameUser } from '../../../types';
import { RootState } from '../../types';

// Все данные для компонентов можно получать селекторами
// структура данных стора может поменяться (с ростом сложности приложения это очень вероятно), можно будет поправить селекторы и компоненты продолжать работать как раньше,
// если селектор будет возвращать то, что от него ожидают

export function getUser(state: RootState): GameUser {
  return state.user.data;
}

export function getUserNickname(state: RootState): string {
  return state.user.data?.nickname;
}

export function getUserGameParameters(state: RootState): GameParameters {
  return state.user.data?.gameParameters;
}

// Нет смысла отдельно хранить признак авторизации пользователя,
// достаточно проверить есть ли объект с его данными в redux
export function getAuthorized(state: RootState): boolean {
  return Boolean(state.user.data);
}

// Нет смысла отдельно хранить признак того, что авторизация проверена,
// достаточно в начале работы приложения установить значение в undefined,
// а после первой проверки авторизации поменять на объект пользователя либо на null.
// Возможно, это не самое красивое решение, но мне кажется что оно допустимо,
// так как реализует хорошую идею: нет смысла без необходимости дублировать данные,
// всё, что может быть вычислено на лету, должно быть вычислено на лету
export function getAuthorizationChecked(state: RootState): boolean {
  return typeof state.user.data !== 'undefined';
}
