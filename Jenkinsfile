pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        EC2_IP = '54.84.190.206'
        SSH_CRED = 'git-ssh-key'
        REPO = 'git@github.com:Gaurav1517/MRA-Job-Portal.git'
        APP_DIR = '/home/ubuntu/mra-job-portal'
    }

    stages {
        stage('Pull Frontend Repo on EC2') { 
            steps { 
                sshagent (credentials: ["${SSH_CRED}"]) { 
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                            if [ ! -d "${APP_DIR}" ]; then
                                git clone ${REPO} ${APP_DIR}
                            else
                                rm -rf ${APP_DIR}
                                git clone ${REPO} ${APP_DIR}
                            fi
                        '
                    """
                } 
            } 
        }
        
        stage('Install Node.js') {
            steps {
                script {
                    sshagent (credentials: ["${SSH_CRED}"]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                        # Install Node.js if not already installed.
                        if ! command -v npm > /dev/null 2>&1; then
                            echo "Node.js not found. Installing..."
                            cd /tmp &&
                            wget -q https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-x64.tar.xz &&
                            tar -xf node-v23.11.1-linux-x64.tar.xz &&
                            sudo mv node-v23.11.1-linux-x64 /usr/local/node &&
                            sudo ln -sf /usr/local/node/bin/node /usr/local/bin/node &&
                            sudo ln -sf /usr/local/node/bin/npm /usr/local/bin/npm
                        else
                            echo "Node.js is already installed."
                        fi
                        '
                        """
                    }
                }
            }
        }

        stage('Install PM2 and serve') {
            steps {
                script {
                    sshagent (credentials: ["${SSH_CRED}"]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                        # Install PM2 globally if not available.
                        if ! command -v pm2 > /dev/null 2>&1; then
                            echo "PM2 not found. Installing..."
                            npm install -g pm2 >> /dev/null 2>&1
                            sudo ln -sf /usr/local/node/bin/pm2 /usr/local/bin/pm2
                        else
                            echo "PM2 is already installed."
                        fi

                        # Install serve globally if not available.
                        if ! command -v serve > /dev/null 2>&1; then
                            echo "serve not found. Installing..."
                            npm install -g serve >> /dev/null 2>&1
                            sudo ln -sf /usr/local/node/bin/serve /usr/local/bin/serve
                        else
                            echo "serve is already installed."
                        fi
                        '
                        """
                    }
                }
            }
        }
        
        stage('Build React App') {
            steps {
                script {
                    sshagent (credentials: ["${SSH_CRED}"]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                        cd ${APP_DIR} &&
                        npm install >> /dev/null &&
                        npm run build
                        '
                        """
                    }
                }
            }
        }

        stage('Start App with PM2') {
            steps {
                script {
                    sshagent (credentials: ["${SSH_CRED}"]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                        cd ${APP_DIR} &&
                        pm2 delete mra-job-portal || true &&
                        pm2 start serve --name "mra-job-portal" -- -s build -l tcp://0.0.0.0:3000
                        '
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Pipeline completed successfully!"
            }
        }
        failure {
            script {
                echo "Pipeline failed!"
            }
        }
    }
}