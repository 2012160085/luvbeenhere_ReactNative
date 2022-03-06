pipeline {
    agent {
        docker {
            image 'expo-jenkins-slave:latest'
            args '-u root:root -v /aab:/root/.m2'
        }
    }
    environment {
        EXPO_TOKEN=credentials('expo-credential')
        AWS_CRED=credentials('aws_admin')
    }
    stages {
        stage('setting environmnet') {
            steps {
                script {
                    sh """echo ${AWS_CRED} | base64 -d > $HOME/.aws/credentials"""
                }
            }
        }
        stage('install dependencies') {
            steps {
                script {
                    sh 'npm install'
                    sh 'expo install'
                }
            }
        }
        stage('eas build') {
            steps {
                script {
                    sh 'eas build --platform android --local'
                }
            }
        }
        stage('send artifact') {
            steps {
                script {
                    sh 'aws s3 cp . s3://my-bucket/path --include "*.aab"'
                }
            }
        }
    }
    post { cleanup { cleanWs() } }
}