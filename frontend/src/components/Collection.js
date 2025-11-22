import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiX, FiShoppingCart, FiHeart, FiZoomIn, FiStar, FiFilter, FiChevronDown } from 'react-icons/fi';
import { fetchAllJewelryData } from '../utils/fetchJewelryData';
import './Collection.css';

const Collection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(['All', 'Gold', 'Diamond', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  
  // Advanced filter states
  const [showFilters, setShowFilters] = useState(true);
  const [metalType, setMetalType] = useState([]);
  const [purity, setPurity] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [gemstone, setGemstone] = useState([]);
  const [gender, setGender] = useState([]);

  const metalTypes = ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold'];
  const purityLevels = ['14K', '18K', '22K', '24K', '925 Silver', '950 Platinum'];
  const occasions = ['Wedding', 'Engagement', 'Anniversary', 'Daily Wear', 'Party', 'Festival'];
  const gemstones = ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'None'];
  const genders = ['Women', 'Men', 'Unisex'];

  // Fetch real jewelry data from APIs
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch jewelry data from multiple public APIs
        const jewelryData = await fetchAllJewelryData();
        
        // Transform data to match our format
        const transformedProducts = jewelryData.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.emoji || product.image, // Use emoji or real image
          rating: product.rating,
          reviews: product.reviews,
          featured: product.featured,
          description: product.description,
          inStock: product.inStock,
          brand: product.brand || 'Tanishq',
          // Advanced filter fields
          metal: product.metal,
          purity: product.purity,
          gemstone: product.gemstone,
          occasion: product.occasion,
          gender: product.gender
        }));
        
        setProducts(transformedProducts);
        console.log(`✅ Loaded ${transformedProducts.length} real jewelry products from APIs`);
      } catch (error) {
        console.error('Error loading jewelry data:', error);
        // Fallback to empty array if APIs fail
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle search from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      setSearchQuery(searchTerm);
    }
  }, [location.search]);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Advanced filters - Metal Type
    if (metalType.length > 0) {
      filtered = filtered.filter(product => 
        product.metal && metalType.includes(product.metal)
      );
    }

    // Advanced filters - Purity
    if (purity.length > 0) {
      filtered = filtered.filter(product => 
        product.purity && purity.includes(product.purity)
      );
    }

    // Advanced filters - Occasion
    if (occasion.length > 0) {
      filtered = filtered.filter(product => 
        product.occasion && occasion.includes(product.occasion)
      );
    }

    // Advanced filters - Gemstone
    if (gemstone.length > 0) {
      filtered = filtered.filter(product => 
        product.gemstone && gemstone.includes(product.gemstone)
      );
    }

    // Advanced filters - Gender
    if (gender.length > 0) {
      filtered = filtered.filter(product => 
        product.gender && gender.includes(product.gender)
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => b.featured - a.featured);
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortBy, searchQuery, metalType, purity, occasion, gemstone, gender]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    console.log('Adding to cart:', product);
    showToast(`Added ${product.name} to cart!`);
  };

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const showToast = (message) => {
    // Simple toast implementation - could be enhanced with a toast library
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

  const SkeletonCard = () => (
    <div className="product-card skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-rating"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  return (
    <div className="collection">
      <div className="collection-header">
        <div className="container">
          <h1 className="collection-title">Our Collection</h1>
          <p className="collection-subtitle">
            Discover our curated selection of exquisite jewelry pieces
          </p>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="category-navbar">
        <div className="category-navbar-content">
          {['All', 'Gold', 'Diamond', 'Rings', 'Necklaces', 'Earrings'].map(category => (
            <button
              key={category}
              className={`category-nav-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="collection-content">
        <div className="container">
          <div className="collection-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filter-section">
                <h3>Categories</h3>
                <div className="category-filters">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Price Range</h3>
                <div className="price-filter">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="price-slider"
                  />
                  <div className="price-display">
                    $0 - ${priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="filter-section">
                <h3>Metal Type</h3>
                <div className="checkbox-group">
                  {metalTypes.map(metal => (
                    <label key={metal} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={metalType.includes(metal)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMetalType([...metalType, metal]);
                          } else {
                            setMetalType(metalType.filter(m => m !== metal));
                          }
                        }}
                      />
                      <span>{metal}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Purity</h3>
                <div className="checkbox-group">
                  {purityLevels.map(level => (
                    <label key={level} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={purity.includes(level)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPurity([...purity, level]);
                          } else {
                            setPurity(purity.filter(p => p !== level));
                          }
                        }}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Occasion</h3>
                <div className="checkbox-group">
                  {occasions.map(occ => (
                    <label key={occ} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={occasion.includes(occ)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOccasion([...occasion, occ]);
                          } else {
                            setOccasion(occasion.filter(o => o !== occ));
                          }
                        }}
                      />
                      <span>{occ}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Gemstone</h3>
                <div className="checkbox-group">
                  {gemstones.map(gem => (
                    <label key={gem} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={gemstone.includes(gem)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGemstone([...gemstone, gem]);
                          } else {
                            setGemstone(gemstone.filter(g => g !== gem));
                          }
                        }}
                      />
                      <span>{gem}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Gender</h3>
                <div className="checkbox-group">
                  {genders.map(g => (
                    <label key={g} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={gender.includes(g)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGender([...gender, g]);
                          } else {
                            setGender(gender.filter(gen => gen !== g));
                          }
                        }}
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                className="btn-tanishq-secondary btn-sm"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => {
                  setMetalType([]);
                  setPurity([]);
                  setOccasion([]);
                  setGemstone([]);
                  setGender([]);
                  setPriceRange([0, 10000]);
                  setSelectedCategory('All');
                }}
              >
                Clear All Filters
              </button>

              {searchQuery && (
                <div className="filter-section">
                  <h3>Search Results</h3>
                  <p className="search-info">
                    Showing results for "{searchQuery}"
                    <button 
                      className="clear-search"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear
                    </button>
                  </p>
                </div>
              )}
            </aside>

            {/* Products Grid */}
            <main className="products-section">
              <div className="products-header">
                <div className="products-count">
                  {filteredProducts.length} Products Found
                </div>
                <div className="sort-controls">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              <div className="products-grid">
                {isLoading ? (
                  // Skeleton loading state
                  Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="product-card"
                      onClick={() => setQuickViewProduct(product)}
                    >
                      <div className="product-image">
                        <span className="product-emoji">{product.image}</span>
                        {product.featured && (
                          <span className="featured-badge">Featured</span>
                        )}
                        {!product.inStock && (
                          <span className="out-of-stock-badge">Out of Stock</span>
                        )}
                        <button 
                          className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                          onClick={(e) => toggleWishlist(product.id, e)}
                          aria-label="Add to wishlist"
                        >
                          <FiHeart size={20} />
                        </button>
                        <button 
                          className="quick-view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          aria-label="Quick view"
                        >
                          <FiZoomIn size={20} />
                        </button>
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-rating">
                          <div className="stars">
                            {Array(5).fill(0).map((_, i) => (
                              <FiStar 
                                key={i} 
                                size={14} 
                                fill={i < Math.round(product.rating) ? '#f59e0b' : 'none'}
                                stroke={i < Math.round(product.rating) ? '#f59e0b' : '#d6d3d1'}
                              />
                            ))}
                          </div>
                          <span className="rating-text">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <div className="product-price">
                          ${product.price.toLocaleString()}
                        </div>
                        <button
                          className="add-to-cart-btn"
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!product.inStock}
                        >
                          <FiShoppingCart size={16} />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products">
                    <div className="no-products-icon">🔍</div>
                    <h3>No Products Found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quick-view-modal" onClick={() => setQuickViewProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
            
            <div className="modal-layout">
              <div className="modal-image-section">
                <div className="modal-product-image">
                  <span className="modal-product-emoji">{quickViewProduct.image}</span>
                </div>
                {quickViewProduct.featured && (
                  <span className="modal-featured-badge">Featured</span>
                )}
              </div>
              
              <div className="modal-details-section">
                <h2 className="modal-product-title">{quickViewProduct.name}</h2>
                <div className="modal-rating">
                  <div className="stars">
                    {Array(5).fill(0).map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={18} 
                        fill={i < Math.round(quickViewProduct.rating) ? '#f59e0b' : 'none'}
                        stroke={i < Math.round(quickViewProduct.rating) ? '#f59e0b' : '#d6d3d1'}
                      />
                    ))}
                  </div>
                  <span className="modal-rating-text">
                    {quickViewProduct.rating} ({quickViewProduct.reviews} reviews)
                  </span>
                </div>
                
                <p className="modal-description">{quickViewProduct.description}</p>
                
                <div className="modal-price">
                  ${quickViewProduct.price.toLocaleString()}
                </div>
                
                <div className="modal-stock-status">
                  {quickViewProduct.inStock ? (
                    <span className="in-stock">✓ In Stock</span>
                  ) : (
                    <span className="out-of-stock">✗ Out of Stock</span>
                  )}
                </div>
                
                <div className="modal-actions">
                  <button
                    className="modal-add-to-cart"
                    onClick={(e) => {
                      handleAddToCart(quickViewProduct, e);
                      setQuickViewProduct(null);
                    }}
                    disabled={!quickViewProduct.inStock}
                  >
                    <FiShoppingCart size={20} />
                    {quickViewProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button
                    className={`modal-wishlist ${wishlist.includes(quickViewProduct.id) ? 'active' : ''}`}
                    onClick={(e) => toggleWishlist(quickViewProduct.id, e)}
                    aria-label="Add to wishlist"
                  >
                    <FiHeart size={20} />
                  </button>
                  <button
                    className="modal-view-details"
                    onClick={() => {
                      navigate(`/product/${quickViewProduct.id}`);
                    }}
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
