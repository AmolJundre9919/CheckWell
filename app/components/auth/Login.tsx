'use client';

import GoogleButton from './GoogleButton';
import EmailForm from './EmailForm';
import Divider from './Divider';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      // Implement Google OAuth login logic here
      console.log('Google login clicked');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      // Implement email/password login logic here
      console.log('Email login:', email, password);
    } catch (error) {
      console.error('Email login error:', error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      
      <GoogleButton onClick={handleGoogleLogin} />
      
      <Divider />
      
      <EmailForm onSubmit={handleEmailLogin} />
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login; 