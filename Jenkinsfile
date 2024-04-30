pipeline {
	agent any

	stages {
		stage ('Build Image') {
			steps {
				ls 
				script {
					dockerapp = docker.build("cdonat-dev/bk_998877_backend")
				}
			}
		}
	}
}