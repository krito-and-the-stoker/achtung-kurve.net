#!/bin/bash

BACKEND_SCRIPTS="backend/src"
LOCAL_BUILD="frontend/dist"

DB_LIVE="backend/db-live.php"
DB_INCLUDE="$LOCAL_BUILD/events/include/db.php"

echo "Building frontend..."
rm -rf "$LOCAL_BUILD"
cd frontend && npm run build && cd ..

echo "Adding backend files..."
cp -R -v "$BACKEND_SCRIPTS/" "$LOCAL_BUILD"

# Get the live credentials onto the server
cp -v "$DB_LIVE" "$DB_INCLUDE"

echo "Done"