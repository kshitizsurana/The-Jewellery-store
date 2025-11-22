import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home';
import Collection from './components/Collection';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    
    // Load theme preference
    if (storedTheme === 'dark') {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme');
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (userData, userToken) => {
    console.log('handleLogin called with:', { userData, token: userToken ? '[token present]' : '[no token]' });
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', userToken);
    localStorage.setItem('authUser', JSON.stringify(userData));
    console.log('Authentication state updated, user should see dashboard now');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout}
          isDarkTheme={isDarkTheme}
          onToggleTheme={toggleTheme}
        />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/login" element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          <Route path="/signup" element={
            !isAuthenticated ? (
              <Signup onLogin={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          
          {/* Protected routes */}
          <Route path="/cart" element={
            isAuthenticated ? (
              <Cart />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/wishlist" element={
            isAuthenticated ? (
              <Wishlist user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/profile" element={
            isAuthenticated ? (
              <Profile user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Payment Routes */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          
          {/* Legacy routes */}
          <Route path="/auth" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
        
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
