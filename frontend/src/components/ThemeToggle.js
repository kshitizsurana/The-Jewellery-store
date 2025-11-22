import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggle.css';

const ThemeToggle = ({ isDarkTheme, onToggle }) => {
  return (
    <button 
      className="theme-toggle-btn" 
      onClick={onToggle}
      aria-label="Toggle theme"
      title={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className={`theme-toggle-slider ${isDarkTheme ? 'dark' : 'light'}`}>
        <FiSun className="theme-icon sun-icon" size={16} />
        <FiMoon className="theme-icon moon-icon" size={16} />
      </div>
    </button>
  );
};
export default ThemeToggle;
