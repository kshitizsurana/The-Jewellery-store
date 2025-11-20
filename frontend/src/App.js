import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Collection from './components/Collection';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
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
          <Route path="/profile" element={
            isAuthenticated ? (
              <Profile user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
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
      </div>
    </Router>
  );
}

export default App;
