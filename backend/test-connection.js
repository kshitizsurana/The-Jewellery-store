const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testConnection() {
  console.log('Testing Aiven database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set (hidden for security)' : 'NOT SET');
  
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to Aiven database!');
    
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query test successful:', result);
    
    try {
      const userCount = await prisma.user.count();
      const jewelryCount = await prisma.jewelry.count();
      console.log(`✅ Found ${userCount} users and ${jewelryCount} jewelry items in database`);
    } catch (error) {
      console.log('ℹ️  Tables not yet created (this is normal for first-time setup)');
      console.log('   Run "npx prisma db push" to create tables');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('💡 This might be a DNS/host resolution issue. Check your host URL.');
    } else if (error.message.includes('Access denied')) {
      console.error('💡 This might be an authentication issue. Check your username and password.');
    } else if (error.message.includes('SSL')) {
      console.error('💡 This might be an SSL issue. Make sure SSL is properly configured.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
