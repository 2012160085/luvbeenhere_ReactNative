/* groovylint-disable NestedBlockDepth */
pipeline {
    agent { docker 'expo-docker-slave'}
    stages {
        stage('Build Image') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
    }
    post { cleanup { cleanWs() } }
}