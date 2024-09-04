@echo off
start cmd /k "cd ./fe && npm run dev"
start cmd /k "cd ./be && npm run dev"
start cmd /k "cd ./pb && pocketbase serve"