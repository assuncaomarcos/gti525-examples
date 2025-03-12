CREATE DATABASE IF NOT EXISTS toronto;
USE toronto;

CREATE TABLE neighborhoods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    area GEOMETRY
);