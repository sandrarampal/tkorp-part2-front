import React from 'react';
import styles from '../../styles/components/errorDisplay.module.css';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h3>An error has occured</h3>
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay; 