pipeline {
    agent {
        docker {
            image 'angular/ngcontainer' 
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