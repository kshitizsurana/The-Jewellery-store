import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo - Left Corner */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Jewellery Store</span>
        </Link>

        {/* Navigation Links - Middle */}
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-item ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/collection" 
            className={`navbar-item ${isActive('/collection') ? 'active' : ''}`}
          >
            Collection
          </Link>
          <Link 
            to="/cart" 
            className={`navbar-item ${isActive('/cart') ? 'active' : ''}`}
          >
            Cart
          </Link>
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className={`navbar-item ${isActive('/dashboard') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          )}
          <Link 
            to="/profile" 
            className={`navbar-item ${isActive('/profile') ? 'active' : ''}`}
          >
            Profile
          </Link>
        </div>

        {/* Right Side Actions - Search & Auth */}
        <div className="navbar-actions">
          {/* Search Bar */}
          <div className="search-container">
            <form 
              className="search-form"
              onSubmit={handleSearch}
            >
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button 
                  type="submit"
                  className="search-submit"
                  aria-label="Search"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* User Info */}
          {isAuthenticated && user && (
            <div className="user-info">
              <span className="user-greeting">
                Hi, {user.name || user.email?.split('@')[0] || 'User'}!
              </span>
            </div>
          )}

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <button 
              className="auth-button logout-button"
              onClick={handleAuthAction}
            >
              Logout
            </button>
          ) : (
            <div className="auth-buttons">
              <button 
                className="auth-button login-button"
                onClick={handleLogin}
              >
                Login
              </button>
              <button 
                className="auth-button signup-button"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
