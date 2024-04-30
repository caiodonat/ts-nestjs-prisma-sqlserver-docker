pipeline {
	agent any

	stages {
		stage ('Build Image') {
			steps {
				script {
					dockerapp = docker.build("cdonat-dev/bk_998877_backend")
				}
			}
		}
	}
}