import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-sm ${className}`}>
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
      </div>
      <div className="flex-1 pt-0.5">
        <p className="text-red-900 font-semibold text-sm sm:text-base">Error</p>
        <p className="text-red-700 text-xs sm:text-sm mt-1">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;