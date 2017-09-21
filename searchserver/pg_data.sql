-- Insert Directly Into Mac
-- psql thesis_devel raiders -f pg_data.sql

DELETE FROM awards;
DELETE FROM crew;
DELETE FROM genres;
DELETE FROM movies;

INSERT INTO genres (name) VALUES (unnest(
    array['drama', 'action', 'comedy', 'crime', 'thriller']
  ));

INSERT INTO movies (title, year, release_date, genre, director, writer, actors, box_office, production) VALUES
  ('Black Swan', '2010', '["17 Dec 2010"]', '["Drama", "Thriller"]', '["Darren Aronofsky"]', '["Mark Heyman (screenplay), Andres Heinz (screenplay), John J. McLaughlin (screenplay), Andres Heinz (story)"]', '["Natalie Portman, Mila Kunis, Vincent Cassel, Barbara Hershey"]', 106952327, 'Fox Searchlight');

INSERT INTO movies (title, year, release_date, genre, director, writer, actors, box_office, production) VALUES
  ('Lego Indiana Jones and the Raiders of the Lost Brick', '2008', '["10 May 2008"]', '["Animation", "Short", "Adventure"]', '["Peder Pedersen"]', '["Ole Holm Christensen (story), Thomas Sebastian Fenger (story), Keith Malone (story), Peder Pedersen (story)"]', '[]', null, '');

INSERT INTO movies (title, year, release_date, genre, director, writer, actors, box_office, production) VALUES
  ('Raiders of the Lost Ark', '1981', '["12 Jun 1981"]', '["Action", "Adventure"]', '["Steven Spielberg"]', '["Lawrence Kasdan (screenplay), George Lucas (story by), Philip Kaufman (story by)"]', '["Harrison Ford", "Karen Allen", "Paul Freeman", "Ronald Lacey"]', null, 'Paramount Pictures');
