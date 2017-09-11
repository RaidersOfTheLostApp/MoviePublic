// insert into genres (name) values ('Action'), ('Adventure'), ('Adult'), ('Animation'), ('Biography'), ('Comedy'), ('Documentary'), ('Drama'), ('Family'), ('Horror'), ('Musical'), ('Mystery'), ('Romance'), ('Sci-Fi'), ('Short'), ('Thriller');
// update movies set genres = '["Drama", "Romance"]' where genres = '["Drama, Romance"]';
// update movies set genres = '["Drama", "Family"]' where genres = '["Drama, Family"]';
// update movies set genres = '["Animation", "Adventure", "Family"]' where genres = '["Animation, Adventure, Family"]';
// update movies set genres = '["Action", "Horror", "Sci-Fi"]' where genres = '["Action, Horror, Sci-Fi"]';
// update movies set genres = '["Action", "Animation", "Comedy"]' where genres = '["Animation, Action, Comedy"]';
// update movies set genres = '["Adventure", "Drama", "Sci-Fi"]' where genres = '["Adventure, Drama, Sci-Fi"]';
// update movies set genres = '["Documentary", "Short"]' where genres = '["Documentary, Short"]';
// update movies set genres = '["Action", "Adventure", "Sci-Fi"]' where genres = '["Action, Adventure, Sci-Fi"]';
// update movies set genres = '["Horror", "Mystery", "Thriller"]' where genres = '["Horror, Mystery, Thriller"]';
// update movies set genres = '["Comedy", "Romance"]' where genres = '["Comedy, Romance"]';
// update movies set genres = '["Musical", "Romance"]' where genres = '["Musical, Romance"]';
// update movies set genres = '["Animation", "Comedy", "Family"]' where genres = '["Animation, Comedy, Family"]';
// update movies set genres = '["Adventure", "Comedy"]' where genres = '["Adventure, Comedy"]';
// update movies set genres = '["Adventure", "Family", "Mystery"]' where genres = '["Adventure, Family, Mystery"]';
// update movies set genres = '["Horror", "Thriller"]' where genres = '["Horror, Thriller"]';
// update movies set genres = '["Comedy", "Family", "Fantasy"]' where genres = '["Comedy, Family, Fantasy"]';
// update movies set genres = '["Biography", "Drama", "Romance"]' where genres = '["Biography, Drama, Romance"]';
// update movies set genres = '["Adventure", "Comedy", "Drama"]' where genres = '["Adventure, Comedy, Drama"]';

// select * from movies where genres::jsonb @> '["Comedy"]';
//
// insert into crew (name, actor)  values (

// TODO: need to add indexes to the arrays for lookups
