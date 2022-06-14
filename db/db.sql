-- list DB           \l
-- create DB         CREATE DATABASE (nameDB)
-- connect DB        \c (nameDB)
-- list tables       \d
-- list nametable    \d (nameTable)
-- add column        ALTER TABLE (tableName) ADD COLUMN (nameColumn) (typeData)
-- delete column     ALTER TABLE (tableName) DROP COLUMN (nameColumn)
-- delete table      DROP TABLE (tableName)
-- select all        SELECT * FROM (tableName)


CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) 
    values(123, 'macdonalds', 'new york', 3);

