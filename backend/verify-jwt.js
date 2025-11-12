#!/usr/bin/env node

// JWT Token Verification Script
// This script demonstrates the JWT token verification process

const jwt = require('jsonwebtoken');

// Example token from our authentication system
// (Replace this with actual token from your app)
const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsIm5hbWUiOiJUZXN0IFVzZXIiLCJpYXQiOjE3NjI4NzA2ODEsImV4cCI6MTc2Mjk1NzA4MX0.ZCcbIt8HPfQKvQa7HtZwopMaRWNHEP8JvZQglzEQu7I";

console.log('🚀 JWT Token Verification Demo\n');

// Decode without verification (just to see payload)
try {
  const decoded = jwt.decode(sampleToken, { complete: true });
  
  console.log('📋 Token Header:');
  console.log(JSON.stringify(decoded.header, null, 2));
  
  console.log('\n📋 Token Payload:');
  console.log(JSON.stringify(decoded.payload, null, 2));
  
  console.log('\n⏰ Token Timing:');
  const now = Math.floor(Date.now() / 1000);
  const iat = decoded.payload.iat;
  const exp = decoded.payload.exp;
  
  console.log(`Issued at: ${new Date(iat * 1000).toISOString()}`);
  console.log(`Expires at: ${new Date(exp * 1000).toISOString()}`);
  console.log(`Current time: ${new Date().toISOString()}`);
  console.log(`Token is ${exp > now ? '✅ VALID' : '❌ EXPIRED'}`);
  
} catch (error) {
  console.error('❌ Error decoding token:', error.message);
}

console.log('\n🔗 To verify this token:');
console.log('1. Copy the token above');
console.log('2. Go to https://jwt.io');
console.log('3. Paste the token in the "Encoded" section');
console.log('4. Verify the payload matches the user data');

console.log('\n📖 Example token for jwt.io:');
console.log(sampleToken);

console.log('\n💡 JWT Secret (for verification): randomstring');
console.log('   (This is from your .env file - JWT_SECRET)');
