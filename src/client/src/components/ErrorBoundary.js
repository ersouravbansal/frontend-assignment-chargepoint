import React, { useState, useEffect, useCallback } from 'react';
import * as Sentry from '@sentry/react';

const logErrorToMyService = (error, errorInfo) => {
  Sentry.captureException(error, { extra: errorInfo });
};

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback((error, errorInfo) => {
    logErrorToMyService(error, errorInfo);
    setHasError(true);
  }, []);

  useEffect(() => {
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, [handleError]);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export default ErrorBoundary;
