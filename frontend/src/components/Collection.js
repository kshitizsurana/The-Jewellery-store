import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Collection.css';

const Collection = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock product data
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Diamond Solitaire Ring",
        price: 2999,
        category: "Rings",
        image: "Ring",
        rating: 4.8,
        reviews: 124,
        featured: true
      },
      {
        id: 2,
        name: "Pearl Necklace",
        price: 899,
        category: "Necklaces",
        image: "Necklace",
        rating: 4.6,
        reviews: 89,
        featured: true
      },
      {
        id: 3,
        name: "Gold Stud Earrings",
        price: 599,
        category: "Earrings",
        image: "Earrings",
        rating: 4.7,
        reviews: 156,
        featured: false
      },
      {
        id: 4,
        name: "Tennis Bracelet",
        price: 1299,
        category: "Bracelets",
        image: "Bracelet",
        rating: 4.9,
        reviews: 73,
        featured: true
      },
      {
        id: 5,
        name: "Luxury Watch",
        price: 4599,
        category: "Watches",
        image: "Watch",
        rating: 4.8,
        reviews: 201,
        featured: false
      },
      {
        id: 6,
        name: "Emerald Ring",
        price: 3299,
        category: "Rings",
        image: "Ring",
        rating: 4.5,
        reviews: 92,
        featured: false
      }
    ];
    setProducts(mockProducts);
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

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]);

  const handleAddToCart = (product) => {
    // This would integrate with your cart functionality
    console.log('Adding to cart:', product);
    alert(`Added ${product.name} to cart!`);
  };

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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <span className="product-emoji">{product.image}</span>
                        {product.featured && (
                          <span className="featured-badge">Featured</span>
                        )}
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-rating">
                          <span className="rating-text">
                            {product.rating} stars ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="product-price">
                          ${product.price.toLocaleString()}
                        </div>
                        <button
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
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
    </div>
  );
};

export default Collection;
