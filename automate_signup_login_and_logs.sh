#!/bin/bash
# This script automates signup, login, and shows MongoDB logs for StudyBlocks MERN demo
# Usage: bash automate_signup_login_and_logs.sh

set -e
EMAIL="demo_$(date +%s)@studyblocks.com"
PASSWORD="demopassword"
API_URL="http://localhost:4000/api/v1"

# 1. Signup
SIGNUP_RESPONSE=$(curl -s -X POST "$API_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Demo","lastName":"User","email":"'$EMAIL'","password":"'$PASSWORD'","confirmPassword":"'$PASSWORD'","accountType":"Student","contactNumber":"1234567890"}')

if echo "$SIGNUP_RESPONSE" | grep -q 'success":true'; then
  echo "[SUCCESS] Signup completed for $EMAIL"
else
  echo "[ERROR] Signup failed: $SIGNUP_RESPONSE"
  exit 1
fi

# 2. Login
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"'$EMAIL'","password":"'$PASSWORD'"}')

if echo "$LOGIN_RESPONSE" | grep -q 'success":true'; then
  echo "[SUCCESS] Login completed for $EMAIL"
else
  echo "[ERROR] Login failed: $LOGIN_RESPONSE"
  exit 1
fi

# 3. Show the latest logs
sleep 1
node server/scripts/showLoginLogs.js | head -n 40

# 4. Summary
cat <<EOF

[INFO] Demo complete!
- Signup and login for $EMAIL succeeded.
- The latest logs are shown above.
- You can run this script as many times as you want for a fresh demo!
EOF
