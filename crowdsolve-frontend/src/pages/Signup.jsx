import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SingupForm.jsx';
import AuthLayout from '../components/auth/AuthLayout';

const Signup = () => {
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600 mt-2">Join CrowdSolve and start solving problems</p>
      </div>

      <SignupForm />

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;