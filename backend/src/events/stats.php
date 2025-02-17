<?php
$pdo = require('include/db.php');

// Get the number of days from the GET parameter, defaulting to 30
$days = isset($_GET['days']) ? (int) $_GET['days'] : 30;

try {
    // Prepare the SQL query with a date filter
    $query = "SELECT
                COUNT(DISTINCT user) AS distinct_users,
                COUNT(CASE WHEN type = 'VISIT' THEN 1 END) AS visits,
                COUNT(CASE WHEN type = 'GAME' THEN 1 END) AS games,
                COUNT(CASE WHEN type = 'ROUND' THEN 1 END) AS rounds,
                COUNT(CASE WHEN type = 'ROUND' AND JSON_UNQUOTE(JSON_EXTRACT(data, '$.players')) = '1' THEN 1 END) AS rounds_1p,
                COUNT(CASE WHEN type = 'ROUND' AND JSON_UNQUOTE(JSON_EXTRACT(data, '$.players')) = '2' THEN 1 END) AS rounds_2p,
                COUNT(CASE WHEN type = 'ROUND' AND JSON_UNQUOTE(JSON_EXTRACT(data, '$.players')) = '3' THEN 1 END) AS rounds_3p,
                COUNT(CASE WHEN type = 'ROUND' AND JSON_UNQUOTE(JSON_EXTRACT(data, '$.players')) = '4' THEN 1 END) AS rounds_4p,
                COUNT(CASE WHEN type = 'ROUND' AND JSON_UNQUOTE(JSON_EXTRACT(data, '$.players')) = '5' THEN 1 END) AS rounds_5p,
                COUNT(CASE WHEN type = 'ROUND' AND JSON_UNQUOTE(JSON_EXTRACT(data, '$.players')) = '6' THEN 1 END) AS rounds_6p
              FROM events
              WHERE created_at >= NOW() - INTERVAL :days DAY";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':days', $days, PDO::PARAM_INT);
    $stmt->execute();

    // Fetch the results
    $counts = $stmt->fetch(PDO::FETCH_ASSOC);

    // Add player statistics
    $counts['player'] = [
        '1' => $counts['rounds_1p'],
        '2' => $counts['rounds_2p'],
        '3' => $counts['rounds_3p'],
        '4' => $counts['rounds_4p'],
        '5' => $counts['rounds_5p'],
        '6' => $counts['rounds_6p']
    ];

    // Remove redundant individual player counts from root JSON
    unset($counts['rounds_1p'], $counts['rounds_2p'], $counts['rounds_3p'],
          $counts['rounds_4p'], $counts['rounds_5p'], $counts['rounds_6p']);

    // Add the days parameter to the output
    $counts['days'] = $days;
    
    // Return the result as JSON
    echo json_encode($counts, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
