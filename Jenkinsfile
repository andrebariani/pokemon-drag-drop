pipeline {
    agent {
        docker {
            image 'node:13-alpine' 
            args '-p 4200:4200' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install -g @angular/cli -y'
                sh 'npm install && ng build' 
            }
        }
    }
}