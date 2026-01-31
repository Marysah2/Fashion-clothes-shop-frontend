import React from 'react';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[40vh] p-6"
      role="status"
      aria-live="polite"
    >
      <div 
        className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
        aria-hidden="true"
      ></div>
      {text && (
        <span className="mt-4 text-gray-600 font-medium">{text}</span>
      )}
      <span className="sr-only">Content is loading</span>
    </div>
  );
};

export default Loader;