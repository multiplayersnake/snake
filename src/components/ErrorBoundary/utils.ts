import React from 'react';

export function logError(error: Error, errorInfo: React.ErrorInfo) {
  console.log(error, errorInfo);
}
