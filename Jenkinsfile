/* groovylint-disable NestedBlockDepth */
pipeline {
    agent {
        docker {
            image 'expo-jenkins-slave:latest'
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