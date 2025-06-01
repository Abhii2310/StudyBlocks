#!/bin/bash

# Health check for ELK + backend log pipeline

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

function check_container {
  name=$1
  if docker ps --format '{{.Names}}' | grep -q "$name"; then
    echo -e "${GREEN}✔ $name is running${NC}"
  else
    echo -e "${RED}✖ $name is NOT running${NC}"
    exit 1
  fi
}

echo "Checking ELK containers..."
check_container "elasticsearch"
check_container "logstash"
check_container "kibana"

# Check backend log file exists and is not empty
LOG_FILE="server/logs/app.log"
echo -n "Checking backend log file... "
if [ -s "$LOG_FILE" ]; then
  echo -e "${GREEN}OK${NC}"
else
  echo -e "${RED}Missing or empty: $LOG_FILE${NC}"
  exit 1
fi

# Check Elasticsearch for logs
ES_HEALTH=$(curl -s http://localhost:9200/_cat/health?h=status)
if [[ "$ES_HEALTH" == "green" || "$ES_HEALTH" == "yellow" ]]; then
  echo -e "${GREEN}✔ Elasticsearch health: $ES_HEALTH${NC}"
else
  echo -e "${RED}✖ Elasticsearch health: $ES_HEALTH${NC}"
  exit 1
fi

COUNT=$(curl -s 'http://localhost:9200/studyblocks-logs/_count' | grep -o '"count":[0-9]*' | cut -d: -f2)
if [[ "$COUNT" -gt 0 ]]; then
  echo -e "${GREEN}✔ Logs found in Elasticsearch: $COUNT${NC}"
else
  echo -e "${RED}✖ No logs found in Elasticsearch index studyblocks-logs${NC}"
  exit 1
fi

echo -e "${GREEN}All checks passed! ELK logging pipeline is healthy.${NC}"
