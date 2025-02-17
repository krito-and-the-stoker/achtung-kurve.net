CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each event
    type VARCHAR(50) NOT NULL,           -- Type of the event (e.g., 'GAME')
    data JSON,                           -- Data for the event, can be NULL
    game VARCHAR(32),                    -- Game identifier (MD5 hash)
    session VARCHAR(32) NOT NULL,        -- Session identifier (MD5 hash)
    user VARCHAR(32) NOT NULL,           -- User identifier (MD5 hash)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the event is created
);
