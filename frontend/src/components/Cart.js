import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiX, FiShoppingBag, FiTruck, FiShield, FiCreditCard } from 'react-icons/fi';
import { displayRazorpay } from '../utils/razorpayService';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserInfo(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

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

  const handleCheckout = async () => {
    setIsLoading(true);
    setPaymentError(null);

    try {
      // Validate cart
      if (cartItems.length === 0) {
        setPaymentError('Your cart is empty');
        setIsLoading(false);
        return;
      }

      const finalAmount = (totalAmount * 1.08).toFixed(2); // Including 8% tax
      
      // Prepare order details for Razorpay
      const orderDetails = {
        amount: finalAmount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        customerName: userInfo?.name || 'Guest User',
        customerEmail: userInfo?.email || 'guest@tanishq.com',
        customerPhone: userInfo?.phone || '',
        description: `Purchase of ${cartItems.length} jewelry item(s)`,
        notes: {
          items: cartItems.map(item => `${item.name} (${item.quantity})`).join(', '),
          totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
          source: 'Tanishq E-Commerce'
        }
      };

      console.log('Initiating payment with order details:', orderDetails);

      // Display Razorpay checkout
      await displayRazorpay(orderDetails, {
        themeColor: '#c9a960',
        onSuccess: (response) => {
          console.log('Payment successful:', response);
          // Clear cart on success
          clearCart();
          // Navigate to success page
          const params = new URLSearchParams({
            payment_id: response.paymentId || response.razorpay_payment_id,
            order_id: response.orderId || response.razorpay_order_id,
            amount: Math.round(finalAmount * 100) // Convert to paise
          });
          navigate(`/payment-success?${params.toString()}`);
        },
        onError: (error) => {
          console.error('Payment error:', error);
          const errorMessage = error.message || 'Payment failed. Please try again.';
          setPaymentError(errorMessage);
          setIsLoading(false);
          
          // Navigate to failure page after 2 seconds
          setTimeout(() => {
            const params = new URLSearchParams({
              reason: encodeURIComponent(errorMessage),
              error_code: error.code || 'PAYMENT_ERROR'
            });
            navigate(`/payment-failure?${params.toString()}`);
          }, 2000);
        },
        onDismiss: () => {
          console.log('Payment dismissed by user');
          setIsLoading(false);
          setPaymentError('Payment was cancelled. You can try again when ready.');
        }
      });

    } catch (error) {
      console.error('Checkout error:', error);
      const errorMessage = error.message || 'Failed to initiate payment. Please try again.';
      setPaymentError(errorMessage);
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FiShoppingBag size={80} />
            </div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button className="btn-shop" onClick={() => navigate('/collection')}>
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={item.id} className="cart-item" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="item-image">
                  {item.image === 'Ring' && '💍'}
                  {item.image === 'Necklace' && '📿'}
                  {item.image === 'Earrings' && '💎'}
                </div>
                
                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-category">{item.category}</span>
                  </div>
                  <div className="item-specs">
                    {item.size && <span className="spec-badge">Size: {item.size}</span>}
                    {item.length && <span className="spec-badge">Length: {item.length}</span>}
                    {item.material && <span className="spec-badge">{item.material}</span>}
                  </div>
                </div>

                <div className="item-actions">
                  <div className="item-price">
                    <span className="price-label">Price</span>
                    <span className="price-value">${item.price.toLocaleString()}</span>
                  </div>

                  <div className="quantity-section">
                    <label className="quantity-label">Quantity</label>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    <span className="total-label">Total</span>
                    <span className="total-value">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <FiX size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="summary-value">${totalAmount.toLocaleString()}</span>
              </div>
              
              <div className="summary-row shipping-row">
                <span className="shipping-label">
                  <FiTruck size={16} />
                  Shipping
                </span>
                <span className="summary-value free">FREE</span>
              </div>
              
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span className="summary-value">${(totalAmount * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span>Total</span>
                <span className="summary-value total">${(totalAmount * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="promo-section">
              <input
                type="text"
                placeholder="Enter promo code"
                className="promo-input"
              />
              <button className="promo-btn">Apply</button>
            </div>

            {paymentError && (
              <div className="payment-error-message">
                <span className="error-icon">⚠️</span>
                <div>
                  <strong>Payment Error:</strong>
                  <p style={{ margin: '4px 0 0 0' }}>{paymentError}</p>
                </div>
              </div>
            )}

            <button
              className={`checkout-btn ${isLoading ? 'loading' : ''}`}
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner-small"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <FiCreditCard size={22} />
                  Proceed to Payment
                </>
              )}
            </button>

            <div className="payment-security-badge">
              <FiShield size={18} />
              <span>256-bit Secure Encryption</span>
            </div>

            <div className="payment-methods-supported">
              <div className="payment-methods-title">We Accept</div>
              <div className="payment-methods-icons">
                <div className="payment-method-icon">💳 Cards</div>
                <div className="payment-method-icon">📱 UPI</div>
                <div className="payment-method-icon">🏦 NetBanking</div>
                <div className="payment-method-icon">💰 Wallets</div>
              </div>
            </div>

            <button className="continue-shopping-btn" onClick={() => navigate('/collection')}>
              Continue Shopping
            </button>

            <div className="benefits-list">
              <div className="benefit-item">
                <FiTruck className="benefit-icon" />
                <span>Free worldwide shipping</span>
              </div>
              <div className="benefit-item">
                <FiShield className="benefit-icon" />
                <span>Lifetime warranty</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🔒</span>
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
