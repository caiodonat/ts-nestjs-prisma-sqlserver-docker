pipeline {
	agent any

	stages {
		stage ('Build Image') {
			steps {
				// sh 'docker build'
				script {
					dockerapp = docker.build("cdonat-dev/bk_998877_backend:${env.BUILD_ID}")	
				}
			}
		}
	}
}