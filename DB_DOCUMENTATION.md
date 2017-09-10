# Database Documentation

Additional database documentation to the README.md.

## Author
- [Arthur Liou](https://github.com/artliou)

## Table of Contents

1. [Architecture](#architecture)
1. [Pooling](#pooling)
1. [MongoDB](#mongodb)
1. [Postgresql](#postgresql)
    1. [Data Storage](#installing-dependencies)
1. [Depreciated Documentation](#deprecateddocumentation)

##Architecture

Our Database Architecture consists of two databases:

>Postgresql

>Mongo

along with the ORMs & SQL querying libraries relevant to each database:

>Mongoose

>Bookshelf

>Knex

Having a RDBMS, in particular Postgres, allows us to:

> query data using SQL and JOIN tables
> store transactional, filtered data
> Supports relational data
> Supports unstructured data-types like JSON & JSONB
> Supports ful ltext search features
> Greater funtionality opposed to MongoDB

Having a noSQL, in particular MongoDB allows us to:
> Accumulate data from various sources
> Scal horizontally
> Query Data Faster
> Better stores unstructured data
> Handling a vast amount of data
> Integrated memory caching
> Higher performance (read & write)

Using a hybrid database architecture like ours allows us to utilize the best of both worlds. With an RDBMS like Postgres, we would encounter friction in terms of performance (speed) and scalability in the future. However, MongoDB lacks the relational database design and depth of functionality that we require for our application.

Additional benefits include the positiive benefits of a hybrid architecture over a RDMBS + MemCache. We can expect:
>data will never expire
>consistent access to data & data-handling
>non-duplicated data (most of the time
>developer freedom to choose the right tool for manipulating data & scaling features.

## MongoDB

#

## PostgreSQL

### Data Storage

A decision point in constructing our Postgres schema was how to store our JSON Data - the data types we had available were json vs jsonb.

Arthur decided to go with jsonb to store our data, as:

While jsonb is slower to store inputs due to being in a decomposed binary format, and added conversion overhead, we gain:

> faster processing speed, since we do not need to re-parse

> the ability for indexing, which jsonb supports & json does not

> the removal of duplicate object keys, as json only keeps the last value

In addition, we can accept the loss in added conversion overhead as:

> The major loss in speed will be at the initalization of the application, when the first user/administrator needs to populate the database with all the movies ever in existence.

> After this initalization, we will only be pulling new inputs once a day via Kron, the expected input amount each day will be not as significant as, unless the entertainment industry decides to only announce all their movies/tv shows on a single day, there will be only so much new movies & TV shows that will be announced on a certain day.

Additional Documentation on Postgres Json Data Types:

<https://www.postgresql.org/docs/devel/static/datatype-json.html>

For using PostgresQL with External MongoDB


## Pooling

=======
### Notes on Pooling

We also integrated pooling as it is to our users' advantage that we execute commands/transactions at x at a time rather than the whole entire database. We limited the amount of connections open as as user will gravitate towards the first set of movies, say 5, before looking at the next 5, which would optimize user experience. Example: Rendering 20 movies at a time would take some initalization, compared to rendering 5 first, while the application is able to come up with the next 5 while the user is pursuing the first 5 rendered movies.
  sample pool: { min: 0, max: 5 }

# Deprecated Documentation

Created before integration of Knex & Bookshelf

# Documentation - Previous Notes

Created before integration of Knex & Bookshelf

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
