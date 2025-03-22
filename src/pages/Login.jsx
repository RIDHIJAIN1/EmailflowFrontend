import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext.jsx';
import { userLogin } from '../utils/api';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to navigate programmatically


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };
    try {
      setLoading(true);
      const data = await userLogin(userData);  // Call the login API function
      toast.success('Login successful! Redirecting to home page...');
      login(data.token);

      navigate('/');
    } catch (error) {
      setError(error);  // Set error if login fails
      if (error.response && error.response.status === 401) {
        // Assuming 401 status is returned for incorrect password
        toast.error('Incorrect email or password. Please try again.');
      } else {
        toast.error(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);  // Stop the loading state
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-400 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
