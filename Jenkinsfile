pipeline {
    agent {
        docker {
            image 'expo-jenkins-slave:latest'
            args '-u root:root'
        }
    }
    environment {
        EXPO_TOKEN=credentials('expo-credential')
        ANDROID_SDK_ROOT="/android-sdk/"
        AWS_ACCESS_KEY_ID="AKIAQK2BT2OVKVGGWNPS"
        AWS_SECRET_ACCESS_KEY=credentials('aws_cred_AKIAQK2BT2OVKVGGWNPS')
    }
    stages {
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
                    filename = sh(returnStdout: true, script: 'ls | grep "\\.aab"').trim()
                    sh """aws s3 cp  $filename s3://luvbeenhere-expo-builds/dev/"""
                }
            }
        }
    }
    post { cleanup { cleanWs() } }
}