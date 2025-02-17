<?php
$pdo = require('db.php');

try {
    // Prepare and execute the query
    $query = 'SELECT * FROM events';  // Query to fetch all records from the events table
    $stmt = $pdo->query($query);

    // Fetch all rows from the events table
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the result as JSON
    echo json_encode($events, JSON_PRETTY_PRINT);  // Format output as JSON
} catch (PDOException $e) {
    // Handle error if the connection fails
    echo json_encode(['error' => $e->getMessage()]);
}
?>
