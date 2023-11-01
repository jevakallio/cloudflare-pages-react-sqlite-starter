DROP TABLE IF EXISTS events;

CREATE TABLE
    events (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT,
        event_start_date TEXT
    );

INSERT INTO
    events (event_name, event_start_date)
VALUES
    ('My First Event', '2023-11-01T14:00:00.000Z');