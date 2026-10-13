import React from 'react';
import Button from './Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Failed to load data',
  message = 'An unexpected error occurred while communicating with the server.',
  onRetry,
  isRetrying = false
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-white rounded-2xl border border-rose-200 shadow-2xs">
      <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="secondary"
          onClick={onRetry}
          isLoading={isRetrying}
          icon={RefreshCw}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
