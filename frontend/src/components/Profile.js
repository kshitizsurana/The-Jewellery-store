import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiSettings, FiEdit2, FiSave, FiX, FiTruck, FiCheck, FiClock, FiShoppingBag, FiAward, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import './Profile.css';

const Profile = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    address: user?.address || '123 Main St, New York, NY 10001',
    birthdate: user?.birthdate || '1990-01-01',
    memberSince: user?.createdAt || '2024-01-01',
    preferences: {
      newsletter: true,
      promotions: true,
      smsNotifications: false
    }
  });

  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-11-15',
      status: 'Delivered',
      total: 3499,
      items: [
        { name: 'Diamond Solitaire Ring', price: 2999, quantity: 1 },
        { name: 'Gift Box', price: 500, quantity: 1 }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-11-10',
      status: 'Processing',
      total: 1299,
      items: [
        { name: 'Pearl Necklace', price: 899, quantity: 1 },
        { name: 'Premium Gift Wrap', price: 400, quantity: 1 }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-10-28',
      status: 'Shipped',
      total: 599,
      items: [
        { name: 'Gold Stud Earrings', price: 599, quantity: 1 }
      ]
    }
  ]);

  const [favorites] = useState([
    {
      id: 1,
      name: "Emerald Tennis Bracelet",
      price: 4299,
      image: "Bracelet",
      inStock: true
    },
    {
      id: 2,
      name: "Vintage Diamond Ring",
      price: 5999,
      image: "Ring",
      inStock: false
    },
    {
      id: 3,
      name: "Sapphire Necklace",
      price: 3199,
      image: "Necklace",
      inStock: true
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }));
  };

  const handleSaveProfile = () => {
    // This would normally save to backend
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#28a745';
      case 'shipped':
        return '#007bff';
      case 'processing':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h1 className="profile-name">Welcome, {profileData.name}</h1>
              <p className="profile-email">{profileData.email}</p>
              <p className="member-since">
                <FiAward className="icon" />
                Member since {new Date(profileData.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* Quick Stats */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon orders">
              <FiPackage />
            </div>
            <div className="stat-info">
              <div className="stat-value">{orders.length}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon favorites">
              <FiHeart />
            </div>
            <div className="stat-info">
              <div className="stat-value">{favorites.length}</div>
              <div className="stat-label">Wishlist Items</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon spending">
              <FiDollarSign />
            </div>
            <div className="stat-info">
              <div className="stat-value">
                ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
              </div>
              <div className="stat-label">Total Spent</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon rewards">
              <FiTrendingUp />
            </div>
            <div className="stat-info">
              <div className="stat-value">450</div>
              <div className="stat-label">Reward Points</div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          {/* Navigation Tabs */}
          <div className="profile-tabs">
            <button
              className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
            <button
              className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <div className="profile-card">
                <div className="card-header">
                  <h2>Personal Information</h2>
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isEditing ? 'editing' : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isEditing ? 'editing' : ''}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isEditing ? 'editing' : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label>Birth Date</label>
                      <input
                        type="date"
                        name="birthdate"
                        value={profileData.birthdate}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isEditing ? 'editing' : ''}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={isEditing ? 'editing' : ''}
                    />
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button className="save-btn" onClick={handleSaveProfile}>
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="tab-content">
              <div className="orders-list">
                <h2>Order History</h2>
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order {order.id}</h3>
                        <p className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="order-status">
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {order.status}
                        </span>
                        <div className="order-total">${order.total.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">Qty: {item.quantity}</span>
                          <span className="item-price">${item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-actions">
                      <button className="btn-outline">View Details</button>
                      {order.status === 'Delivered' && (
                        <button className="btn-outline">Reorder</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="tab-content">
              <div className="favorites-grid">
                <div className="favorites-header">
                  <h2>Your Favorites</h2>
                  <button 
                    className="view-all-btn"
                    onClick={() => navigate('/wishlist')}
                  >
                    View Full Wishlist
                  </button>
                </div>
                <div className="favorites-list">
                  {favorites.map(item => (
                    <div key={item.id} className="favorite-card">
                      <div className="favorite-image">
                        <span className="favorite-emoji">{item.image}</span>
                        {!item.inStock && (
                          <div className="out-of-stock">Out of Stock</div>
                        )}
                      </div>
                      <div className="favorite-info">
                        <h3>{item.name}</h3>
                        <div className="favorite-price">${item.price.toLocaleString()}</div>
                        <div className="favorite-actions">
                          <button className={`add-to-cart ${!item.inStock ? 'disabled' : ''}`}>
                            {item.inStock ? 'Add to Cart' : 'Notify When Available'}
                          </button>
                          <button className="remove-favorite">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <div className="settings-card">
                <h2>Notification Preferences</h2>
                <div className="settings-section">
                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={profileData.preferences.newsletter}
                        onChange={handlePreferenceChange}
                      />
                      <span className="checkmark"></span>
                      Email Newsletter
                      <p className="setting-description">
                        Receive updates about new collections and exclusive offers
                      </p>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="promotions"
                        checked={profileData.preferences.promotions}
                        onChange={handlePreferenceChange}
                      />
                      <span className="checkmark"></span>
                      Promotional Emails
                      <p className="setting-description">
                        Get notified about sales, discounts, and special events
                      </p>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="smsNotifications"
                        checked={profileData.preferences.smsNotifications}
                        onChange={handlePreferenceChange}
                      />
                      <span className="checkmark"></span>
                      SMS Notifications
                      <p className="setting-description">
                        Receive text messages for order updates and shipping notifications
                      </p>
                    </label>
                  </div>
                </div>
                
                <div className="settings-actions">
                  <button className="save-btn">Save Preferences</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
