import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ user, token, onLogout }) => {
  const [jewelryData, setJewelryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchJewelryData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/jewelry`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setJewelryData(response.data.jewelry);
        }
      } catch (error) {
        console.error('Error fetching jewelry data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJewelryData();
  }, [token, API_URL]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-background">
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <div className="header-content">
              <div className="welcome-section">
                <h1>Welcome to The Jewellery Store</h1>
                <p className="user-subtitle">Hello {user.name}, explore our exclusive collection</p>
                <p className="user-email">Signed in as: {user.email}</p>
              </div>
              <div className="header-actions">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button onClick={onLogout} className="logout-button">
                  <span className="button-icon">→</span>
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-content">
            {/* User Info Card */}
            <div className="card user-info-card">
              <div className="card-header">
                <h2>
                  Account Information
                </h2>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">
                      Full Name
                    </span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      Email Address
                    </span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      Member Since
                    </span>
                    <span className="info-value">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Jewelry Collection */}
            <div className="card jewelry-collection-card">
              <div className="card-header">
                <h2>
                  Exclusive Jewelry Collection
                </h2>
              </div>
              <div className="card-content">
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading our exquisite collection...</p>
                  </div>
                ) : jewelryData.length > 0 ? (
                  <div className="jewelry-grid">
                    {jewelryData.map((item) => (
                      <div key={item.id} className="jewelry-item">
                        <div className="jewelry-image">
                          <div className="image-placeholder">
                            <span className="jewelry-type-icon">
                              {item.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="jewelry-info">
                          <h3 className="jewelry-name">{item.name}</h3>
                          <p className="jewelry-description">{item.description}</p>
                          <div className="jewelry-details">
                            <span className="jewelry-type">{item.type}</span>
                            <span className="jewelry-material">{item.material}</span>
                          </div>
                          <div className="jewelry-price">
                            {formatPrice(item.price)}
                          </div>
                          <button className="view-details-btn">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <span className="empty-icon">JEWELRY</span>
                    <p>Our collection is being curated. Check back soon for exclusive pieces!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Store Stats */}
            <div className="card stats-card">
              <div className="card-header">
                <h2>
                  Store Statistics
                </h2>
              </div>
              <div className="card-content">
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">{jewelryData.length}</div>
                    <div className="stat-label">Items Available</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      {jewelryData.length > 0 
                        ? formatPrice(Math.min(...jewelryData.map(item => item.price)))
                        : '$0'
                      }
                    </div>
                    <div className="stat-label">Starting From</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">5.0</div>
                    <div className="stat-label">Customer Rating</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">24/7</div>
                    <div className="stat-label">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
