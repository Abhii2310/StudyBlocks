#!/bin/bash

# Start backend and run ELK health check with a single script

set -e

BACKEND_DIR="$(dirname "$0")/server"
HEALTH_CHECK_SCRIPT="$(dirname "$0")/elk_health_check.sh"

# Start backend in the background
cd "$BACKEND_DIR"
echo "Starting backend server..."
npm start &
BACKEND_PID=$!

# Wait for backend to start up
sleep 5

# Run ELK health check
cd "$(dirname "$0")"
echo "\nRunning ELK health check..."
bash "$HEALTH_CHECK_SCRIPT"

# Optionally, kill backend after health check (uncomment if desired)
# kill $BACKEND_PID

echo "\nBackend and ELK health check complete. Backend is running with PID $BACKEND_PID."
