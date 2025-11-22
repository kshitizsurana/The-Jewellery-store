/**
 * Razorpay Payment Routes
 * Handles order creation, payment verification, and payment status
 */

const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const RAZORPAY_CONFIG = require('../config/razorpay.config');

// Initialize Razorpay instance only if not in dev mode
let razorpayInstance = null;
if (!RAZORPAY_CONFIG.DEV_MODE) {
  razorpayInstance = new Razorpay({
    key_id: RAZORPAY_CONFIG.KEY_ID,
    key_secret: RAZORPAY_CONFIG.KEY_SECRET
  });
}

// Dev mode console warning
if (RAZORPAY_CONFIG.DEV_MODE) {
  console.log('\n⚠️  RAZORPAY DEVELOPMENT MODE ACTIVE ⚠️');
  console.log('Mock payment flow enabled. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env for real payments.\n');
}

/**
 * POST /api/payment/create-order
 * Create a new Razorpay order
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    // DEVELOPMENT MODE - Mock order creation
    if (RAZORPAY_CONFIG.DEV_MODE) {
      console.log('🔧 Dev Mode: Creating mock Razorpay order');
      const mockOrder = {
        id: `order_mock_${Date.now()}`,
        entity: 'order',
        amount: amount * 100,
        amount_paid: 0,
        amount_due: amount * 100,
        currency: currency || RAZORPAY_CONFIG.CURRENCY,
        receipt: receipt || `receipt_${Date.now()}`,
        status: 'created',
        attempts: 0,
        notes: notes || {},
        created_at: Math.floor(Date.now() / 1000)
      };

      return res.json({
        success: true,
        order: {
          id: mockOrder.id,
          amount: mockOrder.amount,
          currency: mockOrder.currency,
          receipt: mockOrder.receipt
        },
        key_id: 'rzp_test_mock_key',
        dev_mode: true
      });
    }

    // PRODUCTION MODE - Real Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise (1 INR = 100 paise)
      currency: currency || RAZORPAY_CONFIG.CURRENCY,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    };

    // Create order
    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      },
      key_id: RAZORPAY_CONFIG.KEY_ID
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

/**
 * POST /api/payment/verify
 * Verify Razorpay payment signature
 */
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment details'
      });
    }

    // DEVELOPMENT MODE - Mock verification
    if (RAZORPAY_CONFIG.DEV_MODE) {
      console.log('🔧 Dev Mode: Mock payment verification');
      return res.json({
        success: true,
        message: 'Payment verified successfully (dev mode)',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        dev_mode: true
      });
    }

    // PRODUCTION MODE - Real signature verification
    const sign = razorpay_order_id + '|' + razorpay_payment_id;

    // Generate expected signature
    const expectedSign = crypto
      .createHmac('sha256', RAZORPAY_CONFIG.KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    // Verify signature
    if (razorpay_signature === expectedSign) {
      // Payment is verified
      res.json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });

      // TODO: Update order status in database
      // TODO: Send confirmation email to customer
      // TODO: Update inventory

    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        error: 'Invalid signature'
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
});

/**
 * GET /api/payment/status/:paymentId
 * Get payment status from Razorpay
 */
router.get('/status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Fetch payment details from Razorpay
    const payment = await razorpayInstance.payments.fetch(paymentId);

    res.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100, // Convert paise to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        email: payment.email,
        contact: payment.contact,
        created_at: payment.created_at
      }
    });

  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment status',
      error: error.message
    });
  }
});

/**
 * POST /api/payment/refund
 * Initiate a refund
 */
router.post('/refund', async (req, res) => {
  try {
    const { payment_id, amount, notes } = req.body;

    if (!payment_id) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required'
      });
    }

    // Create refund
    const refund = await razorpayInstance.payments.refund(payment_id, {
      amount: amount ? amount * 100 : undefined, // If amount not specified, full refund
      notes: notes || {}
    });

    res.json({
      success: true,
      message: 'Refund initiated successfully',
      refund: {
        id: refund.id,
        amount: refund.amount / 100,
        status: refund.status,
        payment_id: refund.payment_id
      }
    });

  } catch (error) {
    console.error('Error initiating refund:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate refund',
      error: error.message
    });
  }
});

/**
 * GET /api/payment/config
 * Get Razorpay configuration (public data only)
 */
router.get('/config', (req, res) => {
  res.json({
    success: true,
    config: {
      key_id: RAZORPAY_CONFIG.KEY_ID,
      currency: RAZORPAY_CONFIG.CURRENCY,
      company_name: RAZORPAY_CONFIG.COMPANY_NAME,
      company_logo: RAZORPAY_CONFIG.COMPANY_LOGO
    }
  });
});

module.exports = router;
