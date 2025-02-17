<?php

$pdo = require('db.php');

try {
    // Read incoming JSON data from the POST request
    $jsonInput = file_get_contents('php://input');

    // Decode JSON data
    $data = json_decode($jsonInput, true);

    // Define required fields
    $requiredFields = ['type', 'data', 'session', 'user'];
    $missingFields = [];

    // Check for missing fields
    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            $missingFields[] = $field;
        }
    }

    // If any required fields are missing, return a detailed error message
    if (!empty($missingFields)) {
        echo json_encode([
            'error' => 'Missing required fields',
            'missing_fields' => $missingFields
        ]);
        exit;
    }

    // Prepare the SQL INSERT statement
    $query = 'INSERT INTO events (type, data, game, session, user) VALUES (:type, :data, :game, :session, :user)';
    $stmt = $pdo->prepare($query);

    $json_data = json_encode($data['data']);

    // Bind the parameters to the SQL query
    $stmt->bindParam(':type', $data['type']);
    $stmt->bindParam(':data', $json_data); // Store 'data' as JSON
    $stmt->bindParam(':game', $data['game']);
    $stmt->bindParam(':session', $data['session']);
    $stmt->bindParam(':user', $data['user']);

    // Execute the query
    $stmt->execute();

    // Return success response
    echo json_encode(['success' => 'Event added successfully']);
} catch (PDOException $e) {
    // Handle error if the connection or insertion fails
    echo json_encode(['error' => $e->getMessage()]);
}
?>
