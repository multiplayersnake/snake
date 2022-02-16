import { Indexed } from '../types';

export async function getInitialState(pathname = '/'): Promise<Indexed> {
  return new Promise((ok) => {
    setTimeout(() => {
      // TODO здесь возможна асинхронность ?
      console.log('return initial state...');
      ok({});
    }, 0);
  });
}
