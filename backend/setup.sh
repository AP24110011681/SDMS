#!/bin/bash
# SDMS Backend Installation & Setup Script for macOS

echo "======================================"
echo "SDMS Backend Setup Script"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) found"
echo "✅ npm $(npm --version) found"

# Navigate to backend directory
cd "$(dirname "$0")"
echo ""
echo "📁 Current directory: $(pwd)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Display setup complete message
echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Configure .env file with your MySQL credentials"
echo "   nano .env"
echo ""
echo "2. Ensure MySQL is running"
echo "   brew services start mysql"
echo ""
echo "3. Execute database schema"
echo "   mysql -u root -p < ../database/schema.sql"
echo ""
echo "4. Start the backend server"
echo "   npm start"
echo ""
echo "The backend will run on: http://localhost:3000"
echo "======================================"
