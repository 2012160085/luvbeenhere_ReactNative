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
        GOOGLE_ANDROID_MAP_API_KEY=credentials('google_android_map_api_key')
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
        stage('set credentials') {
            steps {
                script {
                    sh """sed -i 's/__GOOGLE_MAP_API_KEY__/${GOOGLE_ANDROID_MAP_API_KEY}/g' app.json"""
                }
            }
        }
        stage('eas build') {
            steps {
                script {
                    sh 'expo build:android -t app-bundle'
                }
            }
        }
    }
    post {
        cleanup { cleanWs() }
        success {
            sh """curl -d "title=[배포성공] lbh-RN #${BUILD_NUMBER}&content=${BUILD_URL}" -X POST http://luvbeenhere.com:5000/send"""
        }
        failure {
            sh """curl -d "title=[배포실패] lbh-RN #${BUILD_NUMBER}&content=${BUILD_URL}" -X POST http://luvbeenhere.com:5000/send"""
        }
    }
}