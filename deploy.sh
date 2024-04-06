#!/bin/bash
USER=zikoi5
HOST=46.36.220.195
PROJECT_PATH=/home/zikoi5/projects/bots/attalimbot

scp -r ./src $USER@$HOST:$PROJECT_PATH
scp -r ./.eslintrc.js $USER@$HOST:$PROJECT_PATH
scp -r ./.gitignore $USER@$HOST:$PROJECT_PATH
scp -r ./package.json $USER@$HOST:$PROJECT_PATH
scp -r ./tsconfig.json $USER@$HOST:$PROJECT_PATH

ssh $USER@$HOST "source ~/.nvm/nvm.sh && pm2 restart \"[Bot] At-talim\""
