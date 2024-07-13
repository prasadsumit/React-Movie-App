import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthGuardFunction';
import { useNavigate } from 'react-router-dom';
import Toast from '../Card/Toast';

const Login = ({ LoginModalState }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false); // State to track password visibility
  const [passwordStrength, setPasswordStrength] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [toastModal, setToastModal]  = useState(false);
  const [toastData, setToastData] = useState({
    color: "",
    message: "" 
  });

  const Navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const checkPasswordStrength = (password) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    if (hasCapital && hasNumber && hasSpecialChar) {
      return 'Strong';
    } else if (hasCapital && hasNumber) {
      return 'Moderate';
    } else {
      return 'Weak';
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:3030/profile');
      const users = response.data;
      const user = users.find((user) => user.userId === username && user.password === password);

      if (user) {
        console.log('Logged in successfully');
        login(user);
        LoginModalState.handleLoginToggle();
        Navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Failed to connect to the server');
      console.error('Error:', error);
    }

    setLoading(false);
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get('http://localhost:3030/profile');
    const users = response.data;
    const user = users.find((user) => user.userId === userId && user.password === password);

    if (user) {
      setError('User already exists');
      return;
    }

    try {
      const newUser = {
        id: Math.random().toString(),
        firstName,
        lastName,
        Subscription: 'Inactive',
        SubscriptionType: '',
        userId,
        password,
        plan: 'Standard',
        subscriptionStatus: 'Active',
        paymentType: 'Credit Card',
        encryptedPaymentDetails: 'XXXXXXXXXXXX1234',
        watchHistory: [],
        preferences: {
          language: 'English',
          subtitleLanguage: 'English',
          parentalControl: 'PG',
        },
      };

      await axios.post('http://localhost:3030/profile', newUser).then((res) => {
        login(user);
        setToastData({ color: "green", message: "User Signup successfully! please login!" });
        setToastModal(true);
        setTimeout(() => {
          setToastModal(false);
          window.location.href=  "/"
        }, 3000);
      });
      console.log('Signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again later.');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleToggleForm = () => {
    setIsSigningUp((prevState) => !prevState);
  };

  const shouldShowCloseButton = window.location.pathname !== '/login';

  return (
    <div className={`fixed inset-0 overflow-y-auto ${modalOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-75"></div>
        <div className="relative bg-gray-900 w-96 rounded-lg shadow-lg p-8 z-10">
          <img
            className="mx-auto h-10"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />
          {shouldShowCloseButton ? (
            <button className="absolute top-0 right-0 m-4" onClick={handleCloseModal}>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button className="absolute top-0 right-0 m-4" onClick={() => (window.location.href = '/')}>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {isSigningUp ? (
            <form onSubmit={handleSignupSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-lg text-gray-400">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="block w-full rounded-md border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-lg text-gray-400">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="block w-full rounded-md border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="userId" className="block text-lg text-gray-400">
                  Username <span className='text-red-600'>*</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Username"
                    className="block w-full rounded-md border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-lg text-gray-400">
                  Password <span className='text-red-600'>*</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type={passwordVisibility ? 'text' : 'password'} // Toggle input type based on visibility state
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="block w-full rounded-md border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={togglePasswordVisibility} // Toggle password visibility
                  className="mt-1 text-sm text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  {passwordVisibility ? 'Hide' : 'Show'} Password
                </button>
                {password && (
                  <p className="mt-1 text-sm text-gray-400">
                    Password Strength: <span className="font-semibold">{passwordStrength}</span>
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
              <p className="mt-6 text-sm text-center text-gray-400">
                Already have an account?{' '}
                <button onClick={handleToggleForm} className="font-semibold text-yellow-500 hover:text-yellow-400">
                  Login
                </button>
              </p>
              {error && <p className="mt-2 text-red-500 text-xs text-center">{error}</p>}
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type={passwordVisibility ? 'text' : 'password'} // Toggle input type based on visibility state
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    aria-label="Password"
                    className="block w-full rounded-md border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={togglePasswordVisibility} // Toggle password visibility
                  className="mt-1 text-sm text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  {passwordVisibility ? 'Hide' : 'Show'} Password
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Login'}
                </button>
              </div>
              <p className="mt-6 text-sm text-center text-gray-400">
                New User?{' '}
                <button onClick={handleToggleForm} className="font-semibold text-yellow-500 hover:text-yellow-400">
                  Sign up now.
                </button>
              </p>
              {error && <p className="mt-2 text-red-500 text-xs text-center">{error}</p>}
            </form>
          )}
        </div>
        {toastModal && <Toast data={toastData}></Toast>}
      </div>
    </div>
  );
};

export default Login;
