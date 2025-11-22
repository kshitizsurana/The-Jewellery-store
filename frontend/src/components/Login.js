import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import './AuthPage.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);

      if (response.data.success) {
        console.log('Login successful, calling onLogin...');
        onLogin(response.data.user, response.data.token);
      } else {
        setMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.code === 'ECONNREFUSED') {
        setMessage('Cannot connect to server. Please try again later.');
      } else {
        setMessage('An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your jewelry journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>
            </div>

            {message && (
              <div className={`message-box ${message.includes('successful') || message.includes('Welcome') ? 'success-message' : 'error-message'}`}>
                {message}
              </div>
            )}

            <button 
              type="submit" 
              className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner-small"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={18} />
                </>
              )}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">
                  Create one now
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Exclusive member benefits</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Early access to new collections</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Personalized recommendations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
