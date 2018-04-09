DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movies (
  id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  rating VARCHAR(10) NOT NULL,
  thumbnail VARCHAR(300),
  year VARCHAR(4),
  PRIMARY KEY(id)
);
