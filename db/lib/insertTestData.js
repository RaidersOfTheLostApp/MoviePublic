//TODO: uncomment the below and run these in your postgres command line. it can be run about 5 at a time, just copy and paste
// 
// insert into genres (name) values ('Action'), ('Adventure'), ('Adult'), ('Animation'), ('Biography'), ('Comedy'), ('Documentary'), ('Drama'), ('Family'), ('Horror'), ('Musical'), ('Mystery'), ('Romance'), ('Sci-Fi'), ('Short'), ('Thriller');
// insert into genres (name) values ('Western'), ('Crime');
// insert into genres (name) values ('News');
//
// update movies set genres = '["Drama", "Romance"]' where genres = '["Drama, Romance"]';
// update movies set genres = '["Drama", "Family"]' where genres = '["Drama, Family"]';
// update movies set genres = '["Animation", "Adventure", "Family"]' where genres = '["Animation, Adventure, Family"]';
// update movies set genres = '["Action", "Horror", "Sci-Fi"]' where genres = '["Action, Horror, Sci-Fi"]';
// update movies set genres = '["Action", "Animation", "Comedy"]' where genres = '["Animation, Action, Comedy"]';
//
// update movies set genres = '["Adventure", "Drama", "Sci-Fi"]' where genres = '["Adventure, Drama, Sci-Fi"]';
// update movies set genres = '["Documentary", "Short"]' where genres = '["Documentary, Short"]';
// update movies set genres = '["Action", "Adventure", "Sci-Fi"]' where genres = '["Action, Adventure, Sci-Fi"]';
// update movies set genres = '["Horror", "Mystery", "Thriller"]' where genres = '["Horror, Mystery, Thriller"]';
// update movies set genres = '["Comedy", "Romance"]' where genres = '["Comedy, Romance"]';
//
// update movies set genres = '["Musical", "Romance"]' where genres = '["Musical, Romance"]';
// update movies set genres = '["Animation", "Comedy", "Family"]' where genres = '["Animation, Comedy, Family"]';
// update movies set genres = '["Adventure", "Comedy"]' where genres = '["Adventure, Comedy"]';
// update movies set genres = '["Adventure", "Family", "Mystery"]' where genres = '["Adventure, Family, Mystery"]';
// update movies set genres = '["Horror", "Thriller"]' where genres = '["Horror, Thriller"]';
//
// update movies set genres = '["Comedy", "Family", "Fantasy"]' where genres = '["Comedy, Family, Fantasy"]';
// update movies set genres = '["Biography", "Drama", "Romance"]' where genres = '["Biography, Drama, Romance"]';
// update movies set genres = '["Adventure", "Comedy", "Drama"]' where genres = '["Adventure, Comedy, Drama"]';
//
// update movies set genres = '["Comedy", "Crime", "Family"]' where genres = '["Comedy, Crime, Family"]';
// update movies set genres = '["Horror", "Sci-Fi"]' where genres = '["Horror, Sci-Fi"]';
// update movies set genres = '["Action", "Adventure", "Crime"]' where genres = '["Action, Adventure, Crime"]';
// update movies set genres = '["Comedy", "Horror"]' where genres = '["Comedy, Horror"]';
// update movies set genres = '["Horror", "Sci-Fi"]' where genres = '["Horror, Sci-Fi"]';
// update movies set genres = '["Action", "Adventure", "Crime"]' where genres = '["Action, Adventure, Crime"]';
// update movies set genres = '["Comedy", "Horror"]' where genres = '["Comedy, Horror"]';
//
// update movies set genres = '["Documentary", "Comedy"]' where genres = '["Documentary, Comedy"]';
// update movies set genres = '["Horror", "Mystery"]' where genres = '["Horror, Mystery"]';
// update movies set genres = '["Comedy", "Musical"]' where genres = '["Comedy, Musical"]';
// update movies set genres = '["Comedy", "Family"]' where genres = '["Comedy, Family"]';
// update movies set genres = '["Short", "Drama"]' where genres = '["Short, Drama"]';
//
// update movies set genres = '["Comedy", "Drama"]' where genres = '["Comedy, Drama"]';
// update movies set genres = '["Drama", "Horror", "Mystery"]' where genres = '["Drama, Horror, Mystery"]';
// update movies set genres = '["Comedy", "Drama", "Romance"]' where genres = '["Comedy, Drama, Romance"]';
// update movies set genres = '["Animation", "Short", "Comedy"]' where genres = '["Animation, Short, Comedy"]';
// update movies set genres = '["Comedy", "Drama", "Musical"]' where genres = '["Comedy, Drama, Musical"]';
//
// update movies set genres = '["Horror", "Mystery", "Sci-Fi"]' where genres = '["Horror, Mystery, Sci-Fi"]';
// update movies set genres = '["Documentary", "Biography", "Horror"]' where genres = '["Documentary, Biography, Horror"]';
// update movies set genres = '["Adventure", "Fantasy", "Romance"]' where genres = '["Adventure, Fantasy, Romance"]';
// update movies set genres = '["Action", "Comedy", "Crime"]' where genres = '["Action, Comedy, Crime"]';
// update movies set genres = '["Short", "Comedy", "Romance"]' where genres = '["Short, Comedy, Romance"]';
//
// update movies set genres = '["Action", "Drama", "History"]' where genres = '["Action, Drama, History"]';
// update movies set genres = '["Comedy", "Family", "Music"]' where genres = '["Comedy, Family, Music"]';
// update movies set genres = '["Comedy", "Crime", "Drama"]' where genres = '["Comedy, Crime, Drama"]';
// update movies set genres = '["Documentary", "Music"]' where genres = '["Documentary, Music"]';
// update movies set genres = '["Biography", "Comedy", "Drama"]' where genres = '["Biography, Comedy, Drama"]';
//
// update movies set genres = '["Documentary", "News"]' where genres = '["Documentary, News"]';
// update movies set genres = '["Documentary", "Comedy", "Crime"]' where genres = '["Documentary, Comedy, Crime"]';
// update movies set genres = '["Documentary", "Animation", "History"]' where genres = '["Documentary, Animation, History"]';
// update movies set genres = '["Documentary", "History"]' where genres = '["Documentary, History"]';
// update movies set genres = '["Animation", "Short", "Family"]' where genres = '["Animation, Short, Family"]';
// update movies set genres = '["Short", "Comedy"]' where genres = '["Short, Comedy"]';
// update movies set genres = '["Documentary", "Adventure", "Comedy"]' where genres = '["Documentary, Adventure, Comedy"]';
