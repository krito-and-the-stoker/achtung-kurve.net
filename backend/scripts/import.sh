#!/bin/bash

# Check if the correct number of arguments is passed
if [ $# -ne 1 ]; then
  echo "Usage: $0 <sql_file>"
  exit 1
fi

SQL_FILE=$1

# Check if the file exists
if [ ! -f "$SQL_FILE" ]; then
  echo "Error: SQL file '$SQL_FILE' not found."
  exit 1
fi

# Database connection parameters
DB_USER="user"
DB_PASS="userpassword"
DB_NAME="example_db"

# Import the SQL file into MariaDB
echo "Importing SQL file '$SQL_FILE' into database '$DB_NAME'..."

# Run the MySQL client to import the SQL file
mariadb -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$SQL_FILE"

# Check if the import was successful
if [ $? -eq 0 ]; then
  echo "SQL file '$SQL_FILE' imported successfully."
else
  echo "Error importing SQL file '$SQL_FILE'."
  exit 1
fi
