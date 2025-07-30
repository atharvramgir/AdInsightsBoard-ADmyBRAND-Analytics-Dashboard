#!/bin/bash

# ADmyBRAND Insights - Production Deployment Script

echo "🚀 Starting deployment build for ADmyBRAND Insights..."

# Set production environment
export NODE_ENV=production

# Build the client
echo "📦 Building client application..."
npm run build

# Build the server (if build script exists)
if npm run | grep -q "build:server"; then
  echo "🔧 Building server application..."
  npm run build:server
fi

# Run any database migrations if needed
if [ -n "$DATABASE_URL" ]; then
  echo "🗃️ Running database migrations..."
  npm run db:push
fi

echo "✅ Build completed successfully!"
echo "🌐 Application is ready for deployment"
echo ""
echo "To start the production server:"
echo "npm start"
echo ""
echo "Health check endpoint: /api/health"
echo "Dashboard URL: /"