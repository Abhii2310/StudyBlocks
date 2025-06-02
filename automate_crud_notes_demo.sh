#!/bin/bash
# Automate full CRUD demo for Note entity in StudyBlocks MERN backend
# Usage: bash automate_crud_notes_demo.sh
set -e
API_URL="http://localhost:4000/api/v1/notes"

# 1. CREATE
TITLE="Demo Note $(date +%s)"
CONTENT="This is a test note for automated CRUD demo."
echo "[CREATE] Creating note..."
CREATE_RESPONSE=$(curl -s -X POST "$API_URL" -H "Content-Type: application/json" -d '{"title":"'$TITLE'","content":"'$CONTENT'"}')
echo "$CREATE_RESPONSE"
NOTE_ID=$(echo "$CREATE_RESPONSE" | grep -o '"_id":"[^"]*' | grep -o '[a-f0-9]\{24\}')
if [ -z "$NOTE_ID" ]; then
  echo "[ERROR] Failed to create note."
  exit 1
fi

# 2. READ ALL
sleep 1
echo -e "\n[READ ALL] Listing all notes..."
curl -s "$API_URL" | jq

# 3. READ BY ID
sleep 1
echo -e "\n[READ BY ID] Fetching note by ID: $NOTE_ID"
curl -s "$API_URL/$NOTE_ID" | jq

# 4. UPDATE
sleep 1
NEW_TITLE="Updated Note $(date +%s)"
NEW_CONTENT="This note was updated by the automation script."
echo -e "\n[UPDATE] Updating note..."
UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/$NOTE_ID" -H "Content-Type: application/json" -d '{"title":"'$NEW_TITLE'","content":"'$NEW_CONTENT'"}')
echo "$UPDATE_RESPONSE" | jq

# 5. DELETE
sleep 1
echo -e "\n[DELETE] Deleting note..."
DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/$NOTE_ID")
echo "$DELETE_RESPONSE" | jq

# 6. Confirm Deletion
sleep 1
echo -e "\n[CONFIRM] Notes after deletion:"
curl -s "$API_URL" | jq

echo -e "\n[INFO] CRUD automation complete! You can re-run this script for a fresh demo any time."
