pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 4200:4200' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}