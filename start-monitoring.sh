#!/bin/bash

echo "🚀 Starting StudyBlocks monitoring stack..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

# Start the monitoring stack
docker-compose -f docker-compose.monitoring.yml up -d

# Wait for services to start
echo "⏳ Waiting for services to start (this may take a minute)..."
for i in {1..10}; do
  if curl -s http://localhost:3000 >/dev/null; then
    break
  fi
  echo -n "."
  sleep 5
done

echo ""
echo ""
echo "✅ Monitoring stack is up and running!"
echo ""
echo "📊 Grafana Dashboard:    http://localhost:3000"
echo "📈 Prometheus:           http://localhost:9090"
echo "📊 Node Exporter:        http://localhost:9100/metrics"
echo "📊 Application Metrics:  http://localhost:4000/monitoring/metrics"
echo ""
echo "🔑 Grafana Credentials:"
echo "   - Username: admin"
echo "   - Password: admin"
echo ""
echo "🔌 To access the StudyBlocks dashboard in Grafana:"
echo "   1. Log in to Grafana"
echo "   2. Navigate to Dashboards -> Browse"
echo "   3. Open the 'StudyBlocks' folder"
echo "   4. Select 'StudyBlocks Application Metrics'"
echo ""
echo "🛑 To stop the monitoring stack, run:"
echo "   docker-compose -f docker-compose.monitoring.yml down"
