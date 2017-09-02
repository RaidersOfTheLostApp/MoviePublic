DROP DATABASE IF EXISTS movies;
CREATE DATABASE movies;

\c movies;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  year SMALLINT,
  releaseDate jsonb, 
  ratings jsonb,
  genre TEXT[],
  awards TEXT[],
  director TEXT[],
  writer TEXT[],
  cast TEXT[],
  production TEXT,
  boxOffice DOUBLE PRECISION
);

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    movies TEXT[]
);

CREATE TABLE crew_awards (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    year SMALLINT,
    category TEXT,
    movie_id TEXT REFERENCES movies(id),
    crew_id TEXT REFERENCES crew(id)    
);

CREATE TABLE crew (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT[],
    awards TEXT[],
    actor BOOLEAN,
    director BOOLEAN,
    writer BOOLEAN
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT, 1353
    email TEXT,
    follow_genre TEXT[],
    follow_director TEXT[],
    follow_actor TEXT[],
    follow_movies TEXT[],
    follow_writers TEXT[],
    favorites TEXT[]
    first BOOLEAN DEFAULT TRUE,
);

CREATE TABLE payment (
    user_id INTEGER,
    email TEXT,
    method TEXT,
    CCN INTEGER
);

-- \d movies;