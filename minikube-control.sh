#!/bin/bash
# Minikube automation script for DevOps demo

case "$1" in
  start)
    echo "Starting Minikube..."
    minikube start
    echo "Applying Kubernetes manifests..."
    kubectl apply -f k8s-deployment.yaml
    kubectl apply -f k8s-service.yaml
    echo "Your app will be available at:"
    minikube service studyblocks-service --url
    ;;
  stop)
    echo "Stopping Minikube..."
    minikube stop
    ;;
  status)
    minikube status
    kubectl get pods,svc
    ;;
  *)
    echo "Usage: $0 {start|stop|status}"
    exit 1
    ;;
esac
