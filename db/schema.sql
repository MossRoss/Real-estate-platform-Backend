DROP DATABASE IF EXISTS real_estate;

CREATE DATABASE real_estate;

\c real_estate;

DROP TABLE IF EXISTS properties;

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    price NUMERIC(10, 2),
    location VARCHAR(255),
    purpose TEXT,
    is_favorite BOOLEAN,
    image_url VARCHAR(500)
);

-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL
-- );