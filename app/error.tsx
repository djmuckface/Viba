'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Something went wrong!</h2>
        <p className="mt-2 text-sm text-gray-600">
          An error occurred while loading this page.
        </p>
        <div className="mt-8">
          <button
            onClick={reset}
            className="btn-primary"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
} 