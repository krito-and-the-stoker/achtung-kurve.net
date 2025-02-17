#!/bin/bash

# Variables
USER_NAME="ssh300006351"
SERVER_NAME="ngcobalt64.manitu.net"
REMOTE_DIR="/home/sites/site100035030/web/achtungkurve.net"
LOCAL_SCRIPTS="backend/src"
LOCAL_BUILD="frontend/dist"

# Ensure LOCAL_DIR exists
if [ ! -d "$LOCAL_DIR" ]; then
    echo "Error: Local directory '$LOCAL_DIR' does not exist."
    exit 1
fi

cd frontend && npm run build && cd ..

# Run rsync to upload the directory
cp -R "$LOCAL_SCRIPTS/" "$LOCAL_BUILD"
rsync -avz --delete --dry-run "$LOCAL_BUILD/" "$USER_NAME@$SERVER_NAME:$REMOTE_DIR"

# Check if rsync was successful
if [ $? -eq 0 ]; then
    echo "Upload completed successfully."
else
    echo "Upload failed."
    exit 1
fi
