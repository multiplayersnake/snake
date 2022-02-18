import React, { FC } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { ErrorBoundary, Modal} from '../components';

import './App.css';

import { Router } from './Switch';

export const App: FC = () => {
  return (
    <div className="app">
      <Modal />
      <BrowserRouter>
        <main className="content">
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </main>
      </BrowserRouter>
    </div>
  );
};
