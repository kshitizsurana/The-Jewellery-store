import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiDownload, FiArrowRight, FiPackage, FiMail } from 'react-icons/fi';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get payment details from URL params
    const paymentId = searchParams.get('payment_id');
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');

    if (paymentId && orderId) {
      setOrderDetails({
        paymentId,
        orderId,
        amount: amount ? parseFloat(amount) / 100 : 0, // Convert from paise to rupees
        date: new Date().toLocaleString(),
        transactionId: paymentId
      });
    }
  }, [searchParams]);

  const downloadInvoice = () => {
    alert('Invoice download functionality will be implemented soon!');
  };

  if (!orderDetails) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page payment-success-page">
      <div className="payment-container">
        <div className="payment-card success-card">
          {/* Success Icon */}
          <div className="success-animation">
            <FiCheckCircle className="success-icon" size={80} />
            <div className="success-checkmark"></div>
          </div>

          {/* Success Message */}
          <h1 className="payment-title">Payment Successful!</h1>
          <p className="payment-subtitle">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Order Details */}
          <div className="order-details-card">
            <h3 className="order-details-title">Order Details</h3>
            
            <div className="order-detail-row">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">{orderDetails.orderId}</span>
            </div>
            
            <div className="order-detail-row">
              <span className="detail-label">Payment ID</span>
              <span className="detail-value">{orderDetails.paymentId}</span>
            </div>
            
            <div className="order-detail-row">
              <span className="detail-label">Transaction ID</span>
              <span className="detail-value">{orderDetails.transactionId}</span>
            </div>
            
            <div className="order-detail-row">
              <span className="detail-label">Amount Paid</span>
              <span className="detail-value amount">₹{orderDetails.amount.toLocaleString()}</span>
            </div>
            
            <div className="order-detail-row">
              <span className="detail-label">Date & Time</span>
              <span className="detail-value">{orderDetails.date}</span>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="delivery-info">
            <div className="info-icon"><FiPackage size={32} /></div>
            <div className="info-text">
              <h4>🎉 Your Order is Confirmed!</h4>
              <p>Estimated delivery within <strong>5-7 business days</strong></p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px', color: '#78716c' }}>
                We'll send a confirmation email with tracking details soon
              </p>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="email-confirmation">
            <FiMail size={20} />
            <span>Order confirmation sent to your email</span>
          </div>

          {/* Action Buttons */}
          <div className="payment-actions">
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>
              View Order Status
              <FiArrowRight />
            </button>
            
            <button className="btn-secondary" onClick={downloadInvoice}>
              <FiDownload />
              Download Invoice
            </button>
          </div>

          {/* Additional Actions */}
          <div className="additional-actions">
            <button className="btn-link" onClick={() => navigate('/collection')}>
              Continue Shopping
            </button>
            <button className="btn-link" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>

          {/* Support Info */}
          <div className="support-info">
            <p>Need help? Contact our customer support at</p>
            <a href="mailto:support@tanishq.com" className="support-email">
              support@tanishq.com
            </a>
            <p className="support-phone">or call us at 1800-XXX-XXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
