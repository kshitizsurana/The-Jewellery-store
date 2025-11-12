const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

// Middleware
// app.use(cors({
//   origin: [
//     'http://localhost:3000', 
//     'http://localhost:3001', 
//     'http://localhost:3002',
//     process.env.FRONTEND_URL,
//     'https://the-jewellery-store.vercel.app',
//     /^https:\/\/.*\.vercel\.app$/
//   ].filter(Boolean),
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors({
  origin: '*'
}));

app.use(express.json());

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'The Jewellery Store API is running!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    corsOrigins: [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'http://localhost:3002',
      process.env.FRONTEND_URL,
      'https://the-jewellery-store.vercel.app'
    ].filter(Boolean),
    endpoints: {
      register: 'POST /auth/register',
      login: 'POST /auth/login',
      profile: 'GET /auth/profile (requires token)',
      jewelry: 'GET /jewelry'
    }
  });
});

// Register endpoint
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  try {
    console.log('Login attempt:', { email: req.body.email, origin: req.headers.origin });
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('Login validation failed: missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        name: user.name,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      JWT_SECRET
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Protected route - Get jewelry collection
app.get('/api/jewelry', authenticateToken, async (req, res) => {
  try {
    const jewelry = await prisma.jewelry.findMany({
      where: { inStock: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      jewelry
    });

  } catch (error) {
    console.error('Jewelry fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Public route - Get jewelry collection (no auth required)
app.get('/jewelry', async (req, res) => {
  try {
    const jewelry = await prisma.jewelry.findMany({
      where: { inStock: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      jewelry,
      count: jewelry.length
    });

  } catch (error) {
    console.error('Public jewelry fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jewelry collection',
      jewelry: []
    });
  }
});

// Protected route - Get user profile
app.get('/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
}

// Test endpoint to verify JWT externally
app.post('/auth/verify', (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Token required'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      success: true,
      message: 'Token is valid',
      payload: decoded
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    origin: req.headers.origin,
    userAgent: req.headers['user-agent']
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Database connection established`);
  console.log(`🔐 JWT Authentication API ready`);
});
