#!/usr/bin/env node

/**
 * Test Razorpay Payment Endpoints
 * Verifies that all payment routes are working correctly
 */

const API_URL = 'http://localhost:5000';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, url, options = {}) {
  try {
    log(`\nTesting: ${name}`, 'blue');
    log(`URL: ${url}`, 'yellow');
    
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    
    log(`Status: ${response.status}`, response.ok ? 'green' : 'red');
    log(`Content-Type: ${contentType}`, 'yellow');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      log('Response:', 'green');
      console.log(JSON.stringify(data, null, 2));
      return { success: true, data };
    } else {
      const text = await response.text();
      log('Non-JSON Response:', 'red');
      console.log(text.substring(0, 200));
      return { success: false, error: 'Non-JSON response' };
    }
  } catch (error) {
    log(`Error: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('='.repeat(60), 'blue');
  log('  Razorpay Payment Endpoint Tests', 'blue');
  log('='.repeat(60), 'blue');

  // Test 1: Check if backend is running
  log('\n\n1. Testing Backend Health', 'blue');
  await testEndpoint('Backend Health Check', `${API_URL}/`);

  // Test 2: Get Payment Config
  log('\n\n2. Testing Payment Config Endpoint', 'blue');
  await testEndpoint('Get Razorpay Config', `${API_URL}/api/payment/config`);

  // Test 3: Create Order
  log('\n\n3. Testing Order Creation', 'blue');
  const orderResult = await testEndpoint(
    'Create Razorpay Order',
    `${API_URL}/api/payment/create-order`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: 100,
        currency: 'INR',
        receipt: `test_receipt_${Date.now()}`
      })
    }
  );

  if (orderResult.success && orderResult.data.success) {
    log('\n✅ All payment endpoints are working!', 'green');
  } else {
    log('\n❌ Some endpoints are not working properly', 'red');
    log('\nTroubleshooting:', 'yellow');
    log('1. Make sure backend is running: cd backend && node index.js');
    log('2. Check if Razorpay keys are set in backend/.env');
    log('3. Verify the backend is running on port 5000');
  }

  log('\n' + '='.repeat(60), 'blue');
}

// Run tests
runTests().catch(error => {
  log(`\n❌ Test suite failed: ${error.message}`, 'red');
  process.exit(1);
});
