#!groovy
import ci.utils.plab.v2.model.*
import ci.utils.plab.v2.model.acceptanceCriteria.*
import ci.utils.plab.v2.model.loaddrivers.*
import ci.utils.plab.v2.model.reportData.*
import ci.utils.plab.v2.model.test.*

import java.time.OffsetDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter

//Currently, AWS Nexus repository is used to download the maven dependencies as they are not available in GCP Nexus repository
SABRE_NEXUS_URL = "repository.sabre.com"
NEXUS_URL = "repository.sabre-gcp.com"
ARMADA_URL = "https://armada-backend-ngp-armada.apps.ocusw2.scs.dev.ascint.sabrecirrus.com"
SNOW_ASSET_TAG = "SBI:TAB-GCP"
GKE_PROJECT = "sab-dev-cluster-2713"
CLUSTER_NAME = "dev-01-a9wx"
TEMP_DEPLOY_STRATEGY = "com.sabre.ngp-cicd:blue-green:4.0.12"

pipeline {
    agent {
        kubernetes {
            yamlFile './pod.yaml'
            idleMinutes 60
            instanceCap 3
            workingDir '/tmp'
            label 'tvshows-agent'
        }
    }

    stages {
        stage('app install') {
            steps {
                container('yarn') {
                    script {
                        dir("/tmp") {
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
                        dir("/tmp") {
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
                        dir("/tmp/e2e-tests") {
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
                        dir("/tmp/e2e-tests") {
                            sh(script: 'yarn install')
                            sh(script: "yarn run cypress run --config baseUrl=${serviceHost} --spec ${testSuites}")
                        }
                    }
                }
            }
        }
    }
}