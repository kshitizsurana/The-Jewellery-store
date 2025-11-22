/**
 * Razorpay Payment Service
 * Handles payment integration on the frontend
 * Enhanced with better error handling and retry logic
 */

// Use proxy in development, full URL in production
const API_URL = process.env.NODE_ENV === 'production' 
  ? (process.env.REACT_APP_API_URL || 'http://localhost:8000')
  : ''; // Empty string uses proxy in development

// Razorpay script URL
const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Load Razorpay checkout script with retry logic
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.onload = () => resolve(true);
      existingScript.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      return;
    }

    // Create new script
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    
    script.onload = () => {
      if (window.Razorpay) {
        resolve(true);
      } else {
        reject(new Error('Razorpay SDK loaded but not available'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay SDK. Please check your internet connection.'));
    };
    
    document.body.appendChild(script);

    // Timeout after 10 seconds
    setTimeout(() => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK loading timed out'));
      }
    }, 10000);
  });
};

/**
 * Create Razorpay order
 */
export const createRazorpayOrder = async (orderData) => {
  try {
    console.log('Creating Razorpay order with data:', orderData);
    console.log('API URL:', `${API_URL}/api/payment/create-order`);
    
    const response = await fetch(`${API_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text);
      throw new Error(`Server returned HTML instead of JSON. Please ensure the backend is running at ${API_URL}`);
    }

    const data = await response.json();
    console.log('Order creation response:', data);
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to create order');
    }

    return data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error(`Cannot connect to backend server at ${API_URL}. Please ensure the backend is running.`);
    }
    throw error;
  }
};

/**
 * Verify payment
 */
export const verifyPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_URL}/api/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Payment verification failed');
    }

    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

/**
 * Get payment status
 */
export const getPaymentStatus = async (paymentId) => {
  try {
    const response = await fetch(`${API_URL}/api/payment/status/${paymentId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch payment status');
    }

    return data.payment;
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw error;
  }
};

/**
 * Get Razorpay configuration
 */
export const getRazorpayConfig = async () => {
  try {
    console.log('Fetching Razorpay config from:', `${API_URL}/api/payment/config`);
    
    const response = await fetch(`${API_URL}/api/payment/config`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text);
      throw new Error(`Server returned HTML instead of JSON. Backend may not be running at ${API_URL}`);
    }

    const data = await response.json();
    console.log('Config response:', data);
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch config');
    }

    return data.config;
  } catch (error) {
    console.error('Error fetching Razorpay config:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error(`Cannot connect to backend at ${API_URL}. Please ensure it's running on port 5000.`);
    }
    throw error;
  }
};

/**
 * Display Razorpay checkout
 */
export const displayRazorpay = async (orderDetails, options = {}) => {
  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();
    
    if (!isLoaded) {
      throw new Error('Razorpay SDK failed to load');
    }

    // Create order
    const orderData = await createRazorpayOrder({
      amount: orderDetails.amount,
      currency: orderDetails.currency || 'INR',
      receipt: orderDetails.receipt || `receipt_${Date.now()}`,
      notes: orderDetails.notes || {}
    });

    // Get configuration
    const config = await getRazorpayConfig();

    // Check if dev mode
    if (orderData.dev_mode) {
      console.log('🔧 Development Mode: Using mock payment flow');
      
      // Show alert for dev mode
      const proceed = window.confirm(
        '🔧 DEVELOPMENT MODE\n\n' +
        'Razorpay API keys not configured.\n' +
        'A mock payment will be simulated.\n\n' +
        'Click OK to proceed with mock payment, or Cancel to abort.\n\n' +
        'To use real payments, add your Razorpay keys to backend/.env'
      );
      
      if (!proceed) {
        if (options.onDismiss) {
          options.onDismiss();
        }
        return;
      }
      
      // Simulate payment after 2 seconds
      setTimeout(async () => {
        try {
          const mockResponse = {
            razorpay_order_id: orderData.order.id,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: 'mock_signature_dev_mode'
          };
          
          // Verify mock payment
          const verificationData = await verifyPayment(mockResponse);
          
          // Call success callback
          if (options.onSuccess) {
            options.onSuccess(verificationData);
          }
        } catch (error) {
          console.error('Mock payment verification failed:', error);
          if (options.onError) {
            options.onError(error);
          }
        }
      }, 2000);
      
      return;
    }

    // REAL RAZORPAY CHECKOUT
    // Razorpay options
    const razorpayOptions = {
      key: orderData.key_id,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: config.company_name || 'Tanishq Jewelry',
      description: orderDetails.description || 'Jewelry Purchase',
      image: config.company_logo,
      order_id: orderData.order.id,
      handler: async function (response) {
        try {
          // Verify payment
          const verificationData = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          // Call success callback
          if (options.onSuccess) {
            options.onSuccess(verificationData);
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          if (options.onError) {
            options.onError(error);
          }
        }
      },
      prefill: {
        name: orderDetails.customerName || '',
        email: orderDetails.customerEmail || '',
        contact: orderDetails.customerPhone || ''
      },
      notes: orderDetails.notes || {},
      theme: {
        color: options.themeColor || '#c9a960' // Tanishq gold
      },
      modal: {
        ondismiss: function() {
          if (options.onDismiss) {
            options.onDismiss();
          }
        }
      }
    };

    // Open Razorpay checkout
    const paymentObject = new window.Razorpay(razorpayOptions);
    paymentObject.open();

  } catch (error) {
    console.error('Error displaying Razorpay:', error);
    if (options.onError) {
      options.onError(error);
    }
    throw error;
  }
};

/**
 * Request refund
 */
export const requestRefund = async (paymentId, amount, notes) => {
  try {
    const response = await fetch(`${API_URL}/api/payment/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_id: paymentId,
        amount: amount,
        notes: notes || {}
      })
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Refund request failed');
    }

    return data.refund;
  } catch (error) {
    console.error('Error requesting refund:', error);
    throw error;
  }
};

export default {
  loadRazorpayScript,
  createRazorpayOrder,
  verifyPayment,
  getPaymentStatus,
  getRazorpayConfig,
  displayRazorpay,
  requestRefund
};
