import React from 'react';
import logReactRenderError from './logReactRenderError';

import './ErrorBoundary.css';

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
  public state = { hasError: false };

  private static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logReactRenderError(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-message-container">
          <span className="error-message">Произошла неустранимая ошибка, попробуйте обновить приложение</span>
        </div>
      );
    }

    return this.props.children;
  }
}
