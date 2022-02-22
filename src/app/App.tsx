import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary, Modal } from '../components';

import { AppRoutes } from './AppRoutes';

import './App.css';

export const App: FC = () => {
  return (
    <div className="app">
      <Modal />
      <BrowserRouter>
        <main className="content">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </BrowserRouter>
    </div>
  );
};
