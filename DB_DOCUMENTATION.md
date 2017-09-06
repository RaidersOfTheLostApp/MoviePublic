Big Decision Point is how to store our JSON Date - json vs jsonb
Arthur decided to go with jsonb to store our data, as:

While jsonb is slower to store inputs due to being in a decomposed binary format, and added conversion overhead, we gain:
    1) faster processing speed, since we do not need to re-parse
    2) indexing, which jsonb supports
    3) the removal of duplicate object keys, as json only keeps the last value
In addition, we can accept the loss in added conversion overhead as:
    1) The major loss in speed will be at the initaliztion of the application, when the first user/administrator needs to populate the database with all the movies ever in existence.
    2) After this initalization, we will only be pulling new inputs once a day, the expected input amount each day will be not as significant as, unless the entertainment industry decides to only announce all their movies/tv shows on a single day, there will be only so much new movies & TV shows that will be announced on a certain day.

https://www.postgresql.org/docs/devel/static/datatype-json.html

https://blog.2ndquadrant.com/postgresql-anti-patterns-unnecessary-jsonhstore-dynamic-columns/
For using PostgresQL with External MongoDB


Pooling
We also integrated pooling as it is to our users' advantage that we execute commands/transactions at x at a time rather than the whole entire database. We limited the amount of connections open as as user will gravitate towards the first set of movies, say 5, before looking at the next 5, which would optimize user experience. Example: Rendering 20 movies at a time would take some initalization, compared to rendering 5 first, while the application is able to come up with the next 5 while the user is pursuing the first 5 rendered movies.
  pool: { min: 0, max: 5 }


<!-- For Mac -->
> psql -f {file_name}
<!--
OR

> psql -U {user_name} -d {database_name} -f {file_path} -h {host_name}
database_name: Which database should you insert your file data in.

file_path: Absolute path to the file through which you want to perform the importing.

host_name: The name of the host. For development purposes, it is mostly localhost.

<!-- Windows: Run Below in the PSQL Command Line -->
-Enter the PSQL Command Prompt
-Import the SQL File via the command on the next line. -->

> \i c:/Users/Arthur/cs/MovieMaster/db/SCHEMA.SQL
