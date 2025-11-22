import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiXCircle, FiRefreshCw, FiHome, FiHelpCircle } from 'react-icons/fi';
import './PaymentSuccess.css';
import './PaymentFailure.css';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [failureDetails, setFailureDetails] = useState(null);

  useEffect(() => {
    // Get failure details from URL params
    const orderId = searchParams.get('order_id');
    const reason = searchParams.get('reason') || 'Payment was not completed';
    const errorCode = searchParams.get('error_code') || 'PAYMENT_FAILED';

    setFailureDetails({
      orderId: orderId || 'N/A',
      reason,
      errorCode,
      date: new Date().toLocaleString()
    });
  }, [searchParams]);

  const retryPayment = () => {
    // Navigate back to cart for retry
    navigate('/cart');
  };

  if (!failureDetails) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page payment-failure-page">
      <div className="payment-container">
        <div className="payment-card failure-card">
          {/* Failure Icon */}
          <div className="failure-animation">
            <FiXCircle className="failure-icon" size={80} />
          </div>

          {/* Failure Message */}
          <h1 className="payment-title">Payment Failed</h1>
          <p className="payment-subtitle">
            Unfortunately, we couldn't process your payment. Please try again.
          </p>

          {/* Failure Details */}
          <div className="failure-details-card">
            <h3 className="failure-details-title">What happened?</h3>
            
            <div className="failure-detail-row">
              <span className="detail-label">Reason</span>
              <span className="detail-value">{failureDetails.reason}</span>
            </div>
            
            <div className="failure-detail-row">
              <span className="detail-label">Error Code</span>
              <span className="detail-value error-code">{failureDetails.errorCode}</span>
            </div>
            
            {failureDetails.orderId !== 'N/A' && (
              <div className="failure-detail-row">
                <span className="detail-label">Order Reference</span>
                <span className="detail-value">{failureDetails.orderId}</span>
              </div>
            )}
            
            <div className="failure-detail-row">
              <span className="detail-label">Time</span>
              <span className="detail-value">{failureDetails.date}</span>
            </div>
          </div>

          {/* Common Reasons */}
          <div className="common-reasons">
            <div className="reasons-icon">
              <FiHelpCircle size={24} />
            </div>
            <div className="reasons-content">
              <h4>Common reasons for payment failure:</h4>
              <ul>
                <li>Insufficient funds in your account</li>
                <li>Incorrect card details or expired card</li>
                <li>Payment gateway timeout</li>
                <li>Bank declined the transaction</li>
                <li>Network connectivity issues</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="payment-actions">
            <button className="btn-primary retry-btn" onClick={retryPayment}>
              <FiRefreshCw />
              Retry Payment
            </button>
            
            <button className="btn-secondary" onClick={() => navigate('/collection')}>
              Continue Shopping
            </button>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => navigate('/')}>
              <FiHome />
              Back to Home
            </button>
          </div>

          {/* Help Section */}
          <div className="help-section">
            <div className="help-card">
              <h4>Need Assistance?</h4>
              <p>Our customer support team is here to help you</p>
              <div className="help-contacts">
                <a href="mailto:support@tanishq.com" className="help-contact">
                  📧 support@tanishq.com
                </a>
                <a href="tel:1800XXXXXXX" className="help-contact">
                  📞 1800-XXX-XXXX
                </a>
                <button className="help-contact" onClick={() => navigate('/support')}>
                  💬 Live Chat
                </button>
              </div>
            </div>
          </div>

          {/* Alternative Payment Methods */}
          <div className="alternative-payment">
            <p className="alternative-text">
              You can also try using a different payment method
            </p>
            <div className="payment-methods">
              <span className="payment-method">💳 Credit Card</span>
              <span className="payment-method">🏦 Debit Card</span>
              <span className="payment-method">📱 UPI</span>
              <span className="payment-method">🏦 Net Banking</span>
              <span className="payment-method">💰 Wallet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
