import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    console.log('Starting authentication...', { isLogin, API_URL, formData: { ...formData, password: '[hidden]' } });

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      console.log('Making request to:', `${API_URL}${endpoint}`);
      
      const response = await axios.post(`${API_URL}${endpoint}`, formData);
      console.log('Auth response:', response.data);

      if (response.data.success) {
        if (isLogin) {
          // Login successful - redirect to dashboard
          console.log('Login successful, calling onLogin...');
          onLogin(response.data.user, response.data.token);
        } else {
          // Registration successful - automatically log the user in
          console.log('Registration successful, attempting auto-login...');
          try {
            const loginResponse = await axios.post(`${API_URL}/auth/login`, {
              email: formData.email,
              password: formData.password
            });
            console.log('Auto-login response:', loginResponse.data);
            
            if (loginResponse.data.success) {
              console.log('Auto-login successful, calling onLogin...');
              onLogin(loginResponse.data.user, loginResponse.data.token);
            } else {
              setMessage('Registration successful! Please login manually.');
              setIsLogin(true);
              setFormData({ email: formData.email, password: '', name: '' });
            }
          } catch (loginError) {
            console.error('Auto-login error:', loginError);
            setMessage('Registration successful! Please login manually.');
            setIsLogin(true);
            setFormData({ email: formData.email, password: '', name: '' });
          }
        }
      } else {
        console.log('Auth failed:', response.data.message);
        setMessage(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Auth error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setMessage(error.response?.data?.message || 'Network error occurred');
    }

    setIsLoading(false);
  };

  const handleTabSwitch = (loginMode) => {
    setIsLogin(loginMode);
    setMessage('');
    setFormData({ email: '', password: '', name: '' });
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-container">
          <div className="auth-header">
            <div className="logo">
              <div className="logo-icon">JS</div>
              <h1>The Jewellery Store</h1>
            </div>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Welcome back to your exclusive jewelry collection' 
                : 'Join our exclusive community of jewelry lovers'
              }
            </p>
          </div>

          <div className="auth-tabs">
            <button 
              className={isLogin ? 'tab active' : 'tab'}
              onClick={() => handleTabSwitch(true)}
            >
              Sign In
            </button>
            <button 
              className={!isLogin ? 'tab active' : 'tab'}
              onClick={() => handleTabSwitch(false)}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength="6"
                  placeholder={isLogin ? "Enter your password" : "Create a secure password (min 6 chars)"}
                  className="form-input"
                />
              </div>

              {isLogin && (
                <div className="form-extras">
                  <label className="checkbox-container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <button type="button" className="forgot-password">Forgot password?</button>
                </div>
              )}

              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-content">
                    <div className="spinner"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="button-content">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </span>
                )}
              </button>

              {message && (
                <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                  <span className="message-icon">
                    {message.includes('successful') ? '✓' : '✗'}
                  </span>
                  {message}
                </div>
              )}
            </form>

            <div className="auth-switch">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button"
                  onClick={() => handleTabSwitch(!isLogin)}
                  className="switch-button"
                >
                  {isLogin ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </div>
          </div>

          <div className="auth-footer">
            <div className="footer-links">
              <button type="button" className="footer-link">Privacy Policy</button>
              <span className="separator">•</span>
              <button type="button" className="footer-link">Terms of Service</button>
              <span className="separator">•</span>
              <button type="button" className="footer-link">Support</button>
            </div>
            <p className="footer-note">
              Your data is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
