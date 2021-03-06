-- FOR LOADING SCHEMA ON HEROKU / DON'T RUN LOCALLY
-- ?? heroku pg:psql --app app_name DATABASE < SCHEMA.sql
--
-- DROP DATABASE IF EXISTS movies;
-- CREATE DATABASE movies;
--
-- \c movies;
--
-- CREATE TABLE movie (
--   id SERIAL PRIMARY KEY,
--   name TEXT UNIQUE NOT NULL,
--   year SMALLINT,
--   releaseDate jsonb,
--   ratings jsonb,
--   genre TEXT[],
--   awards TEXT[],
--   director TEXT[],
--   writer TEXT[],
--   crew_id TEXT[],
--   production TEXT,
--   boxOffice DOUBLE PRECISION
-- );
--
-- CREATE TABLE genre (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     movies TEXT[]
-- );
--
-- CREATE TABLE crew (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     genre TEXT[],
--     awards TEXT[],
--     actor BOOLEAN,
--     director BOOLEAN,
--     writer BOOLEAN
-- );
--
-- CREATE TABLE awards (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     year SMALLINT,
--     category TEXT,
--     movie_id INTEGER REFERENCES movie(id),
--     crew_id INTEGER REFERENCES crew(id)
-- );
--
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     first_name TEXT NOT NULL,
--     last_name TEXT,
--     display TEXT,
--     avatar TEXT,
--     email TEXT UNIQUE,
--     phone INTEGER,
--     follow_genre TEXT[],
--     follow_director TEXT[],
--     follow_actor TEXT[],
--     follow_movies TEXT[],
--     follow_writers TEXT[],
--     favorites TEXT[],
--     first BOOLEAN DEFAULT TRUE,
--     stamp timestamp
-- );
--
-- CREATE TABLE AUTHS (
--   id SERIAL PRIMARY KEY,
--   type TEXT NOT NULL,
--   oauth_id TEXT,
--   password TEXT,
--   sale TEXT,
--   user_id INTEGER references users(id)
-- );
--
-- CREATE TABLE payment (
--     user_id INTEGER,
--     email TEXT,
--     method TEXT,
--     CCN BIGINT
-- );
