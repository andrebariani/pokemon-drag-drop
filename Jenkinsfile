pipeline {
    agent {
        docker {
            image 'jenkins-node' 
            args '-p 4200:4200' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install && ng build' 
            }
        }
    }
}