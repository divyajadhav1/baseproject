pipeline {
    agent any
    triggers {
        githubPush() // Trigger the pipeline on a push to the repository
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git url: 'https://github.com/mmmohajer/baseproject.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh './automation.sh 1' // For Mac/Linux
                    } else {
                        bat 'automation.sh 2' // For Windows
                    }
                }
            }
        }
        stage('Build') {
            steps {
                // Build the application using Docker
                sh 'docker-compose -f docker-compose-dev.yml up --build -d'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy the application
                sh 'docker-compose -f docker-compose-prod-ssl.yml up --build -d'
            }
        }
    }
    post {
        success {
            // Notify on success
            slackSend(channel: 'C06V21ENT1C', message: "Build Success: ${currentBuild.fullDisplayName}", tokenCredentialId: 'Slack_Token')
        }
        failure {
            // Notify on failure
            slackSend(channel: 'C06V21ENT1C', message: "Build Failed: ${currentBuild.fullDisplayName}", tokenCredentialId: 'Slack_Token')
        }
    }
}