import React from 'react';

const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16">
      <div className="relative">
        {/* Spinning border */}
        <div className={`${sizes[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
        
        {/* Pulsing inner circle */}
        <div className={`absolute inset-0 ${sizes[size]} border-blue-400/30 rounded-full animate-ping`}></div>
      </div>
      
      {text && (
        <p className="mt-4 text-gray-600 font-medium text-sm sm:text-base animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;