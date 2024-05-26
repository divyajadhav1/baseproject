pipeline {
    agent any
    triggers {
        githubPush()
    }
    environment {
        DB_PORT = '5432'
        SERVER_PORT = '5001'
        CELERY_FLOWER_USER = 'djadhav'
        CELERY_FLOWER_PASSWORD = 'divya@iswad'
        APP_URL = 'cicd.iswad.tech'
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/divyajadhav1/baseproject.git', branch: 'master'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    withEnv([
                        "DB_PORT=${env.DB_PORT}",
                        "SERVER_PORT=${env.SERVER_PORT}",
                        "CELERY_FLOWER_USER=${env.CELERY_FLOWER_USER}",
                        "CELERY_FLOWER_PASSWORD=${env.CELERY_FLOWER_PASSWORD}",
                        "APP_URL=${env.APP_URL}"
                    ]) {
                        sh 'docker-compose -f docker-compose-createSSL.yml up --build -d'
                    }
                }
            }
        }
        
    }
    post {
        success {
            emailext(
                to: 'divjadhav18@gmail.com',
                subject: "Build Success: ${currentBuild.fullDisplayName}",
                body: "The build was successful.\n\nBuild Details:\n\n${currentBuild.fullDisplayName}"
            )
        }
        failure {
            emailext(
                to: 'divjadhav18@gmail.com',
                subject: "Build Failed: ${currentBuild.fullDisplayName}",
                body: "The build failed. Please check the Jenkins console output for details.\n\nBuild Details:\n\n${currentBuild.fullDisplayName}"
            )
        }
    }
}

