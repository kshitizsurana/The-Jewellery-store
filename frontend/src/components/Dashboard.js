import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ user, token, onLogout }) => {
  const [jewelryData, setJewelryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'cart', 'jewelry'

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchJewelryData = async () => {
      try {
        console.log('Fetching jewelry data from:', `${API_URL}/jewelry`);
        // Use public endpoint (no auth required)
        const response = await axios.get(`${API_URL}/jewelry`);
        console.log('Jewelry response:', response.data);
        if (response.data.success) {
          setJewelryData(response.data.jewelry || []);
        } else {
          console.log('No jewelry data or unsuccessful response');
          setJewelryData([]);
        }
      } catch (error) {
        console.error('Error fetching jewelry data:', error);
        console.error('Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        // Set empty array on error
        setJewelryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJewelryData();
  }, [API_URL]); // Removed token dependency since we're using public endpoint

  // Initialize cart with mock data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Diamond Solitaire Ring",
        price: 2999,
        quantity: 1,
        image: "Ring",
        size: "7",
        category: "Rings"
      },
      {
        id: 2,
        name: "Pearl Necklace", 
        price: 899,
        quantity: 2,
        image: "Necklace",
        length: "18 inches",
        category: "Necklaces"
      },
      {
        id: 3,
        name: "Gold Stud Earrings",
        price: 599,
        quantity: 1,
        image: "Earrings",
        material: "14K Gold",
        category: "Earrings"
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const formatPrice = (price) => {
    // Handle both string/decimal and number types from database
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numericPrice || 0);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-background">
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <div className="header-content">
              <div className="welcome-section">
                <h1>Welcome to The Jewellery Store Dashboard</h1>
                <p className="user-subtitle">Hello {user.name}, manage your account and cart</p>
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

          {/* Tab Navigation */}
          <div className="dashboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              My Cart ({cartItems.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'jewelry' ? 'active' : ''}`}
              onClick={() => setActiveTab('jewelry')}
            >
              Jewelry Collection
            </button>
          </div>

          {/* Tab Content */}
          <div className="dashboard-content">
            {activeTab === 'overview' && (
              <div className="tab-content">
                {/* Quick Stats */}
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-info">
                      <div className="stat-value">{cartItems.length}</div>
                      <div className="stat-label">Items in Cart</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-info">
                      <div className="stat-value">{formatPrice(getTotalAmount())}</div>
                      <div className="stat-label">Cart Total</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-info">
                      <div className="stat-value">{jewelryData.length}</div>
                      <div className="stat-label">Available Items</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-info">
                      <div className="stat-value">5.0</div>
                      <div className="stat-label">Store Rating</div>
                    </div>
                  </div>
                </div>

                {/* User Info Card */}
                <div className="card user-info-card">
                  <div className="card-header">
                    <h2>Account Information</h2>
                  </div>
                  <div className="card-content">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{user.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{user.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Member Since</span>
                        <span className="info-value">
                          {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cart' && (
              <div className="tab-content">
                <div className="cart-section">
                  <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    {cartItems.length > 0 && (
                      <button className="clear-cart-btn" onClick={clearCart}>
                        Clear Cart
                      </button>
                    )}
                  </div>

                  {cartItems.length > 0 ? (
                    <div className="cart-content">
                      <div className="cart-items">
                        {cartItems.map((item) => (
                          <div key={item.id} className="cart-item">
                            <div className="item-image">
                              <span className="item-text">{item.name.split(' ')[0]}</span>
                            </div>
                            <div className="item-details">
                              <h3 className="item-name">{item.name}</h3>
                              <p className="item-category">{item.category}</p>
                              {item.size && <p className="item-spec">Size: {item.size}</p>}
                              {item.length && <p className="item-spec">Length: {item.length}</p>}
                              {item.material && <p className="item-spec">Material: {item.material}</p>}
                            </div>
                            <div className="item-quantity">
                              <label>Quantity</label>
                              <div className="quantity-controls">
                                <button 
                                  className="quantity-btn"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="quantity-display">{item.quantity}</span>
                                <button 
                                  className="quantity-btn"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="item-price">
                              <div className="price-per-item">{formatPrice(item.price)} each</div>
                              <div className="total-price">{formatPrice(item.price * item.quantity)}</div>
                            </div>
                            <button 
                              className="remove-item-btn"
                              onClick={() => removeItem(item.id)}
                              title="Remove item"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="cart-summary">
                        <div className="summary-row">
                          <span>Subtotal:</span>
                          <span>{formatPrice(getTotalAmount())}</span>
                        </div>
                        <div className="summary-row">
                          <span>Shipping:</span>
                          <span className="free">Free</span>
                        </div>
                        <div className="summary-row">
                          <span>Tax:</span>
                          <span>{formatPrice(getTotalAmount() * 0.08)}</span>
                        </div>
                        <hr className="summary-divider" />
                        <div className="summary-row total">
                          <span>Total:</span>
                          <span>{formatPrice(getTotalAmount() * 1.08)}</span>
                        </div>
                        <button className="checkout-btn">
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-cart">
                      <h3>Your cart is empty</h3>
                      <p>Browse our jewelry collection and add some items to your cart.</p>
                      <button 
                        className="shop-now-btn"
                        onClick={() => setActiveTab('jewelry')}
                      >
                        Shop Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'jewelry' && (
              <div className="tab-content">
                {/* Jewelry Collection */}
                <div className="card jewelry-collection-card">
                  <div className="card-header">
                    <h2>Exclusive Jewelry Collection</h2>
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
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <h3>Collection Loading</h3>
                        <p>Our exclusive jewelry collection is being prepared. Please check your connection or try again.</p>
                        <button 
                          className="retry-button"
                          onClick={() => window.location.reload()}
                        >
                          Refresh Page
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
