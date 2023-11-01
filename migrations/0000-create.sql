DROP TABLE IF EXISTS events;

CREATE TABLE
    IF NOT EXISTS events (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT,
        event_start_date TEXT
    );

INSERT INTO
    events (event_name, event_start_date)
VALUES
    ('My Birthday Party', '2013-02-15')