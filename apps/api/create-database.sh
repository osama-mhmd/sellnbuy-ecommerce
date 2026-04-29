#!/bin/bash

# Configuration - Change these or set them as environment variables
DB_NAME=${DB_NAME:-"sellnbuy"}
DB_USER=${DB_USER:-"postgres"}
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-"5432"}

echo "Creating database: $DB_NAME..."

# The 'createdb' command is a wrapper for the SQL 'CREATE DATABASE' command
createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"

if [ $? -eq 0 ]; then
    echo "Database '$DB_NAME' created successfully."
else
    echo "Failed to create database."
    exit 1
fi
