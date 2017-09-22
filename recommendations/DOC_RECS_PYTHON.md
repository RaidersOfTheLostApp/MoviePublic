# Recommendation & Python Documentation

Additional documentation to the README.md on the backend side of the application involving Python/Django and the Recommendation Engine

Temp: Setup Python/Django, Surprise library,
Input: User.
Python will take the user, go into Postgres, grab the profiles's following & favorites. then go utilize the algo/dataset to provide top 10 recommendations
psycopg2

Connecting to Postgres
http://dataset.readthedocs.io/en/latest/quickstart.html

http://surprise.readthedocs.io/en/stable/dataset.html

brew install python

Add Pip
pip install scikit-surprise


if you are on MacOSX and ElCapitan, you will need to
pip install <package> --user

as you may hit an internal protection called System Integrity Protection built-in OS X El Capitan and later that, among other things, protects some paths of your root filesystem in a way that not even the user root can write to them.


python ./recs.py
Dataset ml-100k could not be found. Do you want to download it? [Y/n] y
Trying to download dataset from http://files.grouplens.org/datasets/movielens/ml-100k.zip...
Done! Dataset ml-100k has been saved to /Users/artliou/.surprise_data/ml-100k


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
