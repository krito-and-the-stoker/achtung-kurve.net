<?php

$host = 'mariadb';      // Use the service name from docker-compose (not 127.0.0.1 if inside Docker container)
$dbname = 'example_db'; // The name of the database
$username = 'user';     // Database username
$password = 'userpassword'; // Database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
} catch (PDOException $e) {
    // Handle error if the connection fails
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}
