import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export const ENV = {
  BASE_URL: import.meta.env.VITE_URL || 'http://localhost:3000'
};

const Login1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${ENV.BASE_URL}/api/users/login`, {
        email,
        password
      });

      const loggedInUser = response.data;

      toast.success('Login successful!', {
        className: 'border-l-4 border-green-500 text-base p-4 shadow-lg',
        style: {
          background: '#f0fff4',
          color: '#22543d',
          fontSize: '1.1rem'
        },
        duration: 4000
      });

      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.error || 'Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout successful!', {
        className: 'border-l-4 border-green-500 text-base p-4 shadow-lg',
        style: {
          background: '#f0fff4',
          color: '#22543d',
          fontSize: '1.1rem'
        },
        duration: 4000
      });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        {!user ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-forthtech-red">Login</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-forthtech-red focus:border-forthtech-red"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
  <div className="relative">
    <input
      id="password"
      type={showPassword ? 'text' : 'password'}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 pr-10 focus:outline-none focus:ring-forthtech-red focus:border-forthtech-red"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-500 focus:outline-none"
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>
</div>


              <button
                onClick={handleLogin}
                className="w-full bg-forthtech-red hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <a href="/signup" className="text-forthtech-red font-medium hover:underline">
                Sign up here
              </a>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center mb-4 text-forthtech-red">
              You are logged in as {user.email}
            </h2>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login1;
