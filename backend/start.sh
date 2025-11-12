#!/bin/bash

# Railway startup script for The Jewellery Store backend
echo "Starting The Jewellery Store backend..."

# Wait for database to be ready
echo "Waiting for database connection..."
sleep 5

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push database schema (creates tables if they don't exist)
echo "Setting up database schema..."
npx prisma db push --accept-data-loss

# Seed the database with jewelry data
echo "Seeding database with jewelry products..."
node seed.js

# Start the server
echo "Starting Express server..."
node index.js
