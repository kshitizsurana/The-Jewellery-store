import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiHeart, FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = ({ isAuthenticated, user, onLogout, isDarkTheme, onToggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    onLogout();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleCollectionClick = () => {
    navigate('/collection');
  };

  return (
    <nav className="navbar-tanishq">
      <div className="navbar-content">
        {/* Logo - Left Corner */}
        <div className="navbar-left">
          <Link to="/" className="logo-tanishq">
            <span className="logo-text-tanishq">Jewellery Store</span>
          </Link>
          
          {/* Collection Button - Next to Logo */}
          <button 
            className="collection-btn"
            onClick={handleCollectionClick}
            aria-label="View Collection"
          >
            Collection
          </button>
        </div>

        {/* Search Bar - Center */}
        <div className="navbar-center">
          <form className="search-pill" onSubmit={handleSearch}>

            <input
              type="text"
              placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-tanishq"
              aria-label="Search jewelry"
            />
          </form>
        </div>

        {/* Right Side - Utility Icons & Auth */}
        <div className="navbar-right">
          {/* Utility Icons */}
          <div className="utility-icons">
            <button 
              className="icon-btn" 
              aria-label="Wishlist"
              onClick={() => navigate(isAuthenticated ? '/wishlist' : '/login')}
            >
              <FiHeart size={20} />
            </button>
            
            <button 
              className="icon-btn" 
              aria-label="Account"
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
            >
              <FiUser size={20} />
            </button>
            
            <button 
              className="icon-btn cart-btn" 
              aria-label="Cart"
              onClick={() => navigate(isAuthenticated ? '/cart' : '/login')}
            >
              <FiShoppingCart size={20} />
              <span className="cart-badge">0</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle isDarkTheme={isDarkTheme} onToggle={onToggleTheme} />

          {/* Auth Buttons */}
          <div className="auth-section-tanishq">
            {isAuthenticated ? (
              <button 
                className="btn-auth-tanishq btn-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div className="auth-buttons-group">
                <button 
                  className="btn-auth-tanishq btn-login"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button 
                  className="btn-auth-tanishq btn-signup"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <button
              className="mobile-collection-btn"
              onClick={() => {
                handleCollectionClick();
                setMobileMenuOpen(false);
              }}
            >
              Collection
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
