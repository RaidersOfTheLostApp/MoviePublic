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

<!-- Windows: -->
c:/Users/Arthur/cs/MovieMaster/db/SCHEMA.SQL