#!/bin/bash
# FINAL CRUD DEMO SCRIPT for StudyBlocks - for showing to mam
# This script will create, read, update, and delete a note, echoing each command and its output
API_URL="http://localhost:4000/api/v1/notes"

set -e

# 1. CREATE
TITLE="Demo Note for Mam $(date +%s)"
CONTENT="This note is created as part of the CRUD demo for mam."
echo -e "\n========== CREATE =========="
echo "> curl -X POST $API_URL -H 'Content-Type: application/json' -d '{\"title\":\"$TITLE\",\"content\":\"$CONTENT\"}'"
CREATE_RESPONSE=$(curl -s -X POST "$API_URL" -H "Content-Type: application/json" -d '{"title":"'$TITLE'","content":"'$CONTENT'"}')
echo "$CREATE_RESPONSE"
NOTE_ID=$(echo "$CREATE_RESPONSE" | grep -o '"_id":"[^"']*' | grep -o '[a-f0-9]\{24\}')

sleep 1
echo -e "\n========== READ ALL =========="
echo "> curl $API_URL"
READ_ALL=$(curl -s "$API_URL")
echo "$READ_ALL"

sleep 1
echo -e "\n========== READ BY ID =========="
echo "> curl $API_URL/$NOTE_ID"
READ_ONE=$(curl -s "$API_URL/$NOTE_ID")
echo "$READ_ONE"

sleep 1
echo -e "\n========== UPDATE =========="
NEW_TITLE="Updated Note for Mam $(date +%s)"
NEW_CONTENT="This note was updated as part of the CRUD demo for mam."
echo "> curl -X PUT $API_URL/$NOTE_ID -H 'Content-Type: application/json' -d '{\"title\":\"$NEW_TITLE\",\"content\":\"$NEW_CONTENT\"}'"
UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/$NOTE_ID" -H "Content-Type: application/json" -d '{"title":"'$NEW_TITLE'","content":"'$NEW_CONTENT'"}')
echo "$UPDATE_RESPONSE"

sleep 1
echo -e "\n========== DELETE =========="
echo "> curl -X DELETE $API_URL/$NOTE_ID"
DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/$NOTE_ID")
echo "$DELETE_RESPONSE"

sleep 1
echo -e "\n========== CONFIRM DELETION (READ ALL) =========="
echo "> curl $API_URL"
CONFIRM_DELETE=$(curl -s "$API_URL")
echo "$CONFIRM_DELETE"

echo -e "\n[INFO] FINAL CRUD demo complete! Show this terminal output to mam to prove full-stack CRUD is working."
