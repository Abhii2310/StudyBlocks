#!/bin/bash
# FINAL CRUD DEMO SCRIPT for StudyBlocks
# This script will create, read, update, and delete a note, echoing each command and its output in a clear, organized way
API_URL="http://localhost:4000/api/v1/notes"
set -e

# Check if jq is available for pretty-printing JSON
JQ_INSTALLED=false
if command -v jq >/dev/null 2>&1; then
  JQ_INSTALLED=true
fi

print_section() {
  echo -e "\n\033[1;34m========== $1 =========\033[0m"
}

print_command() {
  echo -e "\033[1;32m$1\033[0m"
}

print_json() {
  if $JQ_INSTALLED; then
    echo "$1" | jq
  else
    echo "$1"
  fi
}

# 1. CREATE
print_section "CREATE"
TITLE="Demo Note $(date +%s)"
CONTENT="This note is created as part of the final CRUD demo."
print_command "> curl -X POST $API_URL -H 'Content-Type: application/json' -d '{\"title\":\"$TITLE\",\"content\":\"$CONTENT\"}'"
CREATE_RESPONSE=$(curl -s -X POST "$API_URL" -H "Content-Type: application/json" -d '{"title":"'$TITLE'","content":"'$CONTENT'"}')
print_json "$CREATE_RESPONSE"
NOTE_ID=$(echo "$CREATE_RESPONSE" | grep -o '"_id":"[^"']*' | grep -o '[a-f0-9]\{24\}')
if [ -z "$NOTE_ID" ]; then
  echo "[ERROR] Could not extract note ID. Showing CREATE response only."
  exit 1
fi

sleep 1
print_section "READ ALL"
print_command "> curl $API_URL"
ALL_RESPONSE=$(curl -s "$API_URL")
print_json "$ALL_RESPONSE"

sleep 1
print_section "READ BY ID"
print_command "> curl $API_URL/$NOTE_ID"
ONE_RESPONSE=$(curl -s "$API_URL/$NOTE_ID")
print_json "$ONE_RESPONSE"

sleep 1
print_section "UPDATE"
NEW_TITLE="Updated Note $(date +%s)"
NEW_CONTENT="This note was updated as part of the final CRUD demo."
print_command "> curl -X PUT $API_URL/$NOTE_ID -H 'Content-Type: application/json' -d '{\"title\":\"$NEW_TITLE\",\"content\":\"$NEW_CONTENT\"}'"
UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/$NOTE_ID" -H "Content-Type: application/json" -d '{"title":"'$NEW_TITLE'","content":"'$NEW_CONTENT'"}')
print_json "$UPDATE_RESPONSE"

sleep 1
print_section "DELETE"
print_command "> curl -X DELETE $API_URL/$NOTE_ID"
DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/$NOTE_ID")
print_json "$DELETE_RESPONSE"

sleep 1
print_section "CONFIRM DELETION (READ ALL)"
print_command "> curl $API_URL"
CONFIRM_RESPONSE=$(curl -s "$API_URL")
print_json "$CONFIRM_RESPONSE"

echo -e "\n\033[1;33m[INFO] FINAL CRUD demo complete! Show this terminal output to your teacher to prove full-stack CRUD is working.\033[0m"
