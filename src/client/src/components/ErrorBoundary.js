import React, { useState, useEffect, useCallback } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback((error, errorInfo) => {
    setHasError(true);
    console.log("error:", error, "error info:", errorInfo);
  }, []);

  useEffect(() => {
    const errorHandler = (event) => {
      handleError(event.error, { componentStack: event.error.stack });
    };

    const rejectionHandler = (event) => {
      handleError(event.reason, { componentStack: event.reason.stack });
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", rejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  }, [handleError]);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export default ErrorBoundary;
