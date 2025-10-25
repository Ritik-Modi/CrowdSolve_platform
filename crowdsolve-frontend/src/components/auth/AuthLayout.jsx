import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block group">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
              CrowdSolve
            </h1>
            <p className="text-sm text-gray-600 mt-2">Collaborate. Innovate. Solve.</p>
          </Link>
        </div>

        {/* Auth Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 sm:p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm text-gray-600">
            © 2024 CrowdSolve. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;