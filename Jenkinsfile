ipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/divyajadhav1/baseproject.git', branch: 'master'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh './automation.sh 1'
                    } else {
                        bat 'automation.sh 2'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh 'docker-compose -f docker-compose-dev.yml up --build -d'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose -f docker-compose-prod-ssl.yml up --build -d'
            }
        }
    }
    post {
        success {
            emailext(
                to: 'divjadhav18@gmail.com',
                subject: "Build Success: ${currentBuild.fullDisplayName}",
                body: "The build was successful.\n\nBuild Details:\n\n${currentBuild.fullDisplayName}\n\n${currentBuild.url}"
            )
        }
        failure {
            emailext(
                to: 'divjadhav18@gmail.com',
                subject: "Build Failed: ${currentBuild.fullDisplayName}",
                body: "The build failed. Please check the Jenkins console output for details.\n\nBuild Details:\n\n${currentBuild.fullDisplayName}\n\n${currentBuild.url}"
            )
        }
    }
}
