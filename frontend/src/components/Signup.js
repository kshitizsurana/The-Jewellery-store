import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import './AuthPage.css';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Registration successful - automatically log the user in
        console.log('Registration successful, calling onLogin...');
        onLogin(response.data.user, response.data.token);
      } else {
        setMessage(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.code === 'ECONNREFUSED') {
        setMessage('Cannot connect to server. Please try again later.');
      } else {
        setMessage('An error occurred during registration. Please try again.');
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join our luxury jewelry collection</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="form-input"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  className="form-input"
                  minLength="6"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Confirm your password"
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <FiArrowRight size={18} />
                </>
              )}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in
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

export default Signup;
