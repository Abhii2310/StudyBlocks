#!/bin/bash
# Automated CRUD demo for "Note" entity for StudyBlocks - for showing to mam
# This script will create, read, update, and delete a note, showing all output in the terminal
set -e
API_URL="http://localhost:4000/api/v1/notes"

# 1. CREATE
TITLE="Demo Note for Mam $(date +%s)"
CONTENT="This note is created as part of the CRUD demo for mam."
echo "\n========== CREATE =========="
CREATE_RESPONSE=$(curl -s -X POST "$API_URL" -H "Content-Type: application/json" -d '{"title":"'$TITLE'","content":"'$CONTENT'"}')
echo "$CREATE_RESPONSE" | jq
NOTE_ID=$(echo "$CREATE_RESPONSE" | grep -o '"_id":"[^"]*' | grep -o '[a-f0-9]\{24\}')
if [ -z "$NOTE_ID" ]; then
  echo "[ERROR] Failed to create note."
  exit 1
fi

# 2. READ ALL
sleep 1
echo "\n========== READ ALL =========="
curl -s "$API_URL" | jq

# 3. READ BY ID
sleep 1
echo "\n========== READ BY ID =========="
curl -s "$API_URL/$NOTE_ID" | jq

# 4. UPDATE
sleep 1
NEW_TITLE="Updated Note for Mam $(date +%s)"
NEW_CONTENT="This note was updated as part of the CRUD demo for mam."
echo "\n========== UPDATE =========="
UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/$NOTE_ID" -H "Content-Type: application/json" -d '{"title":"'$NEW_TITLE'","content":"'$NEW_CONTENT'"}')
echo "$UPDATE_RESPONSE" | jq

# 5. DELETE
sleep 1
echo "\n========== DELETE =========="
DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/$NOTE_ID")
echo "$DELETE_RESPONSE" | jq

# 6. Confirm Deletion
sleep 1
echo "\n========== CONFIRM DELETION (READ ALL) =========="
curl -s "$API_URL" | jq

echo -e "\n[INFO] CRUD demo complete! Show this terminal output to mam to prove full-stack CRUD is working."
