# The Jewellery Store - Deployment Guide

## Architecture
- **Frontend**: React app hosted on Vercel
- **Backend**: Node.js + Express API hosted on Railway
- **Database**: MySQL database on Railway

## Live URLs (After Deployment)
- **Frontend**: https://the-jewellery-store.vercel.app
- **Backend API**: https://the-jewellery-store-backend.up.railway.app

## Railway Backend Deployment

1. **Connect Repository to Railway**:
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub repo
   - Select the backend folder as root directory

2. **Environment Variables** (Set in Railway dashboard):
   ```
   DATABASE_URL=mysql://avnadmin:your_password@your_host:your_port/defaultdb?ssl-mode=REQUIRED
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=https://the-jewellery-store.vercel.app
   NODE_ENV=production
   ```

3. **Database Setup** (Using Aiven):
   - Use your Aiven MySQL database URL
   - Ensure SSL connection is enabled
   - Prisma will auto-migrate on first startup
   - Seed script will populate jewelry data automatically

4. **Important Notes**:
   - Database migrations happen at runtime, not during build
   - Seeding occurs automatically when the server starts
   - Make sure to set a strong JWT_SECRET in production
   - Aiven requires SSL connections

## Vercel Frontend Deployment

1. **Connect Repository to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Set root directory to `frontend`

2. **Build Configuration**:
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables** (Set in Vercel dashboard):
   ```
   REACT_APP_API_URL=https://the-jewellery-store-backend.up.railway.app
   ```

## Local Development

### Backend
```bash
cd backend
npm install
npm run seed    # Seed database with jewelry products
npm start       # Start on port 8000
```

### Frontend
```bash
cd frontend
npm install
npm start       # Start on port 3001
```

## Features
- **Authentication**: JWT-based login/register
- **Product Management**: Jewelry catalog with images
- **Professional UI**: Modern glassmorphism design
- **Responsive Design**: Mobile-friendly layout
- **Database**: 12 pre-seeded jewelry products

## API Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (authenticated)
- `GET /jewelry` - Get all jewelry products

## Tech Stack
- **Frontend**: React, CSS3, Axios
- **Backend**: Node.js, Express, JWT, bcrypt
- **Database**: MySQL, Prisma ORM
- **Deployment**: Vercel + Railway
