import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiX, FiStar, FiTrendingUp, FiFilter, FiSearch } from 'react-icons/fi';
import './Wishlist.css';

const Wishlist = ({ user }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-added');
  
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      price: 2999,
      originalPrice: 3499,
      category: "Rings",
      image: "💍",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      isNew: false,
      discount: 14,
      addedDate: '2024-11-15',
      description: "Exquisite 1.5 carat diamond solitaire in 18K white gold"
    },
    {
      id: 2,
      name: "Pearl Necklace",
      price: 899,
      originalPrice: 1099,
      category: "Necklaces",
      image: "📿",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      isNew: true,
      discount: 18,
      addedDate: '2024-11-18',
      description: "Elegant freshwater pearl necklace with 18K gold clasp"
    },
    {
      id: 3,
      name: "Gold Stud Earrings",
      price: 599,
      originalPrice: 699,
      category: "Earrings",
      image: "✨",
      rating: 4.9,
      reviews: 234,
      inStock: true,
      isNew: false,
      discount: 14,
      addedDate: '2024-11-10',
      description: "Classic 14K gold stud earrings with secure backs"
    },
    {
      id: 4,
      name: "Emerald Tennis Bracelet",
      price: 4299,
      originalPrice: 5299,
      category: "Bracelets",
      image: "💚",
      rating: 5.0,
      reviews: 67,
      inStock: false,
      isNew: false,
      discount: 19,
      addedDate: '2024-11-05',
      description: "Stunning emerald tennis bracelet in platinum setting"
    },
    {
      id: 5,
      name: "Sapphire Pendant",
      price: 1899,
      originalPrice: 2299,
      category: "Necklaces",
      image: "💙",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      isNew: true,
      discount: 17,
      addedDate: '2024-11-20',
      description: "Royal blue sapphire pendant with diamond halo"
    },
    {
      id: 6,
      name: "Luxury Watch",
      price: 6999,
      originalPrice: 8999,
      category: "Watches",
      image: "⌚",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      isNew: false,
      discount: 22,
      addedDate: '2024-11-12',
      description: "Swiss-made automatic watch with diamond markers"
    }
  ]);

  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'];

  const handleRemoveItem = (id) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
    // Show toast notification
    showToast(`${item.name} added to cart!`);
  };

  const handleMoveAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    console.log('Moving to cart:', inStockItems);
    showToast(`${inStockItems.length} items added to cart!`);
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Filter and sort logic
  let filteredItems = wishlistItems.filter(item => {
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort items
  switch (sortBy) {
    case 'price-low':
      filteredItems.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredItems.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredItems.sort((a, b) => b.rating - a.rating);
      break;
    case 'date-added':
    default:
      filteredItems.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
      break;
  }

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);
  const inStockCount = wishlistItems.filter(item => item.inStock).length;

  return (
    <div className="wishlist">
      <div className="wishlist-container">
        {/* Header */}
        <div className="wishlist-header">
          <div className="header-content">
            <div className="header-text">
              <h1 className="wishlist-title">
                <FiHeart className="heart-icon pulse" />
                My Wishlist
              </h1>
              <p className="wishlist-subtitle">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved · 
                {inStockCount} in stock
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-card mini">
                <div className="stat-value">{formatPrice(totalValue)}</div>
                <div className="stat-label">Total Value</div>
              </div>
              <div className="stat-card mini savings">
                <div className="stat-value">{formatPrice(totalSavings)}</div>
                <div className="stat-label">Total Savings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="wishlist-controls">
          <div className="search-filter-group">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search wishlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <FiFilter className="filter-icon" />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="sort-group">
              <FiTrendingUp className="sort-icon" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date-added">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {wishlistItems.length > 0 && inStockCount > 0 && (
            <button className="add-all-btn" onClick={handleMoveAllToCart}>
              <FiShoppingCart />
              Add All to Cart ({inStockCount})
            </button>
          )}
        </div>

        {/* Wishlist Items */}
        {filteredItems.length > 0 ? (
          <div className="wishlist-grid">
            {filteredItems.map(item => (
              <div key={item.id} className={`wishlist-item ${!item.inStock ? 'out-of-stock' : ''}`}>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove from wishlist"
                >
                  <FiX />
                </button>

                {item.isNew && (
                  <div className="new-badge">NEW</div>
                )}

                {item.discount > 0 && (
                  <div className="discount-badge">-{item.discount}%</div>
                )}

                <div className="item-image">
                  <div className="image-placeholder">
                    <span className="item-emoji">{item.image}</span>
                  </div>
                  {!item.inStock && (
                    <div className="stock-overlay">
                      <span>Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="item-info">
                  <div className="item-category">{item.category}</div>
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  
                  <div className="item-rating">
                    <FiStar className="star-icon filled" />
                    <span className="rating-value">{item.rating}</span>
                    <span className="rating-count">({item.reviews} reviews)</span>
                  </div>

                  <div className="item-price-section">
                    <div className="price-group">
                      <span className="current-price">{formatPrice(item.price)}</span>
                      {item.originalPrice > item.price && (
                        <span className="original-price">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                    {item.discount > 0 && (
                      <div className="savings-text">
                        Save {formatPrice(item.originalPrice - item.price)}
                      </div>
                    )}
                  </div>

                  <div className="item-actions">
                    {item.inStock ? (
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FiShoppingCart />
                        Add to Cart
                      </button>
                    ) : (
                      <button className="notify-btn" disabled>
                        Notify When Available
                      </button>
                    )}
                  </div>

                  <div className="item-meta">
                    Added {new Date(item.addedDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-icon">
              <FiHeart />
            </div>
            <h2>No items found</h2>
            <p>
              {searchQuery || filterCategory !== 'All' 
                ? 'Try adjusting your filters or search terms'
                : 'Start adding items to your wishlist to see them here'}
            </p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/collection')}
            >
              Browse Collection
            </button>
          </div>
        )}

        {/* Summary Card */}
        {wishlistItems.length > 0 && (
          <div className="wishlist-summary">
            <h3>Wishlist Summary</h3>
            <div className="summary-stats">
              <div className="summary-row">
                <span>Total Items:</span>
                <span className="value">{wishlistItems.length}</span>
              </div>
              <div className="summary-row">
                <span>Available Now:</span>
                <span className="value">{inStockCount}</span>
              </div>
              <div className="summary-row">
                <span>Total Value:</span>
                <span className="value golden">{formatPrice(totalValue)}</span>
              </div>
              <div className="summary-row highlight">
                <span>Your Savings:</span>
                <span className="value savings">{formatPrice(totalSavings)}</span>
              </div>
            </div>
            <button className="continue-shopping-btn" onClick={() => navigate('/collection')}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
