import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl md:text-[180px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none">
            404
          </h1>
          <div className="relative -mt-4 sm:-mt-8">
            <div className="text-4xl sm:text-5xl animate-bounce">🤔</div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-2">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <Button icon={Home} size="lg" fullWidth className="sm:w-auto">
              Go Home
            </Button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 text-base font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto opacity-30">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;