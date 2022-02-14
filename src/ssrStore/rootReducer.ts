import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { SsrState } from './types';

export default (history: History) =>
  combineReducers<SsrState>({
    ssrTestData: function ssrTestDataReducer(
      state = {
        time: 'initial SSR test reducer data',
        isServer: true
      },
      action
    ) {
      return state;
    },
    router: connectRouter(history)
  });
