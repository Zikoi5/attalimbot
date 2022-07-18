#!/bin/bash
USER=ubuntu
HOST=ec2-52-7-55-43.compute-1.amazonaws.com
PROJECT_PATH=/home/ubuntu/attalimbot
SSH_KEY=~/.ssh/ziko-aws-ec2.pem

scp -i $SSH_KEY -r ./common $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./lessons $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./middlewares $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./mongo $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./scenes $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./utils $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./plugins $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./.eslintrc.js $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./.gitignore $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./help.js $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./index.js $USER@$HOST:$PROJECT_PATH
scp -i $SSH_KEY -r ./package.json $USER@$HOST:$PROJECT_PATH

ssh -i $SSH_KEY $USER@$HOST "pm2 restart \"At ta'lim bot\""
