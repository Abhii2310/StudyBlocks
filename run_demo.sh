#!/bin/bash
set -e

echo "[1/4] Installing backend dependencies..."
cd server && npm install

# Start backend in background
npm run dev &
BACKEND_PID=$!
cd ..

sleep 5

echo "[2/4] Running MongoDB login/signup demo..."
node server/scripts/demoMongoUsage.js

echo "[3/4] Showing latest login/signup logs..."
node server/scripts/showLoginLogs.js

# Optionally kill backend (or leave running for manual testing)
kill $BACKEND_PID

echo "[4/4] You can now run Postman or curl commands for live demo!"
