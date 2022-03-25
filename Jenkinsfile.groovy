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
        stage('checkout sources') {
            steps {
                script {
                    dir('/tmp') {
                        checkout([
                                $class                           : 'GitSCM',
                                branches                         : scm.branches,
                                doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                                extensions                       : [[$class: 'CloneOption', noTags: false, shallow: false, depth: 0, reference: '']],
                                userRemoteConfigs                : scm.userRemoteConfigs,
                        ])
                        env.currentCommitHash = sh(script: 'git rev-parse HEAD', returnStdout: true)?.trim()
                        sh(returnStdout: true, script: "echo Current branch is ${scm.branches[0].name}")
                        sh(returnStdout: true, script: "echo Current currentCommitHash is ${env.currentCommitHash}")
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