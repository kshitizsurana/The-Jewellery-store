/**
 * Razorpay Configuration
 * Store your Razorpay API keys here
 */

const RAZORPAY_CONFIG = {
  // Test Mode Keys (Replace with your actual keys from Razorpay Dashboard)
  KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID_HERE',
  KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET_HERE',
  
  // Development Mode - Use mock payments if keys are not configured
  DEV_MODE: !process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'rzp_test_YOUR_KEY_ID_HERE',
  
  // Currency
  CURRENCY: 'INR',
  
  // Company Details
  COMPANY_NAME: 'Tanishq Jewelry',
  COMPANY_LOGO: 'https://your-logo-url.com/logo.png',
  
  // Payment Options
  PAYMENT_METHODS: {
    netbanking: true,
    card: true,
    upi: true,
    wallet: true,
    emi: true
  }
};

module.exports = RAZORPAY_CONFIG;
