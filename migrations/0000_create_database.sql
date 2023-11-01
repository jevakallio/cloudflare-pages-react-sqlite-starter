-- Ensure we are starting from scratch
DROP TABLE IF EXISTS products;

-- Create the table
CREATE TABLE
    products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT
    );

-- Seed some fake data
INSERT INTO
    products (product_name)
VALUES
    ('Product A'),
    ('Product B'),
    ('Product C');