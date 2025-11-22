'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-background-secondary border border-gray-700 rounded-lg
          text-white placeholder-gray-500
          focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
          transition-colors duration-200
          ${error ? 'border-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
