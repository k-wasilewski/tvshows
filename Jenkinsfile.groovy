#!groovy
import ci.utils.plab.v2.model.*
import ci.utils.plab.v2.model.acceptanceCriteria.*
import ci.utils.plab.v2.model.loaddrivers.*
import ci.utils.plab.v2.model.reportData.*
import ci.utils.plab.v2.model.test.*

pipeline {
    agent {
        docker { image 'gcr.io/cloud-builders/yarn' }
    }

    stages {
        stage('git clone repository') {
            steps {
                script {
                    dir("/tmp") {
                        sh(returnStdout: true, script: 'git clone https://github.com/k-wasilewski/tvshows.git')
                    }
                }
            }
        }

        stage('app install') {
            steps {
                container('yarn') {
                    script {
                        dir("/tmp/tvshows") {
                            sh(returnStdout: true, script: 'ls')
                            sh(returnStdout: true, script: 'yarn install')
                        }
                    }
                }
            }
        }

        stage('app run') {
            steps {
                container('yarn') {
                    script {
                        dir("/tmp/tvshows") {
                            sh(script: 'yarn start')
                        }
                    }
                }
            }
        }

        stage('install e2e tests') {
            steps {
                container('yarn') {
                    script {
                        dir("/tmp/tvshows/e2e-tests") {
                            sh(returnStdout: true, script: 'ls')
                            sh(returnStdout: true, script: 'yarn install')
                        }
                    }
                }
            }
        }

        stage('run end-to-end tests') {
            steps {
                container('yarn') {
                    script {
                        def serviceHost = "http://localhost:3000"
                        def testSuites = "cypress/integration/main_spec.js"
                        dir("/tmp/tvshows/e2e-tests") {
                            sh(script: 'yarn install')
                            sh(script: "yarn run cypress run --config baseUrl=${serviceHost} --spec ${testSuites}")
                        }
                    }
                }
            }
        }
    }
}