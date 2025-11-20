import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Mock cart data
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

  // Calculate total whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalAmount(total);
  }, [cartItems]);

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

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Thank you for your purchase! Your order has been placed.');
      clearCart();
      setIsLoading(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/collection')}>Start Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <span className="item-text">{item.name.split(' ')[0]}</span>
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-specs">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.length && <span>Length: {item.length}</span>}
                    {item.material && <span>Material: {item.material}</span>}
                  </div>
                  <div className="item-category">{item.category}</div>
                </div>

                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
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
                  <div className="price-per-item">${item.price.toLocaleString()}</div>
                  <div className="total-price">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                <button
                  className="remove-item-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items):</span>
              <span>${totalAmount.toLocaleString()}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free">FREE</span>
            </div>
            
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(totalAmount * 0.08).toFixed(2)}</span>
            </div>
            
            <hr className="summary-divider" />
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(totalAmount * 1.08).toFixed(2)}</span>
            </div>

            <div className="checkout-section">
              <div className="promo-code">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="promo-input"
                />
                <button className="promo-btn">Apply</button>
              </div>

              <button
                className={`checkout-btn ${isLoading ? 'loading' : ''}`}
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <div className="security-info">
                <div className="security-icon">🔒</div>
                <span>Secure checkout with 256-bit SSL encryption</span>
              </div>
            </div>

            <div className="shipping-info">
              <h4>Shipping Information</h4>
              <ul>
                <li>✓ Free shipping on all orders</li>
                <li>✓ 2-3 business days delivery</li>
                <li>✓ 30-day return policy</li>
                <li>✓ Lifetime warranty included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
