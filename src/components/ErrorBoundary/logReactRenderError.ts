import React from 'react';

function logReactRenderError(error: Error, errorInfo: React.ErrorInfo) {
  console.log('React render error:', error, errorInfo);
}

export default logReactRenderError;
