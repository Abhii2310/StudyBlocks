pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // Jenkins credential id
        IMAGE = "abhii2310/studyblocks:latest"
    }

    stages {
        stage('Pre-check') {
            steps {
                echo 'Starting pipeline...'
            }
        }
        stage('Checkout') {
            steps {
                // Clean workspace before checkout to avoid git issues
                cleanWs()
                // Retry checkout up to 3 times in case of transient git/network issues
                retry(3) {
                    checkout scm
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE}")
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds') {
                        docker.image("${IMAGE}").push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s-deployment.yaml'
                sh 'kubectl apply -f k8s-service.yaml'
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed! Please check the logs.'
            // Optionally, add notification steps here (email, Slack, etc.)
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}
