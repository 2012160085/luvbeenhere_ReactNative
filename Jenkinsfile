/* groovylint-disable NestedBlockDepth */
pipeline {
    agent {
        docker {
            label 'expo-docker-slave'
        }
    }
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