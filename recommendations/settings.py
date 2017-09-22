# Django settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'thesis',
        # 'NAME': 'thesis_devel',
        'USER': 'raiders',
        'PASSWORD': 'theLostApp',
        'HOST': 'localhost',
        'PORT': '5432',
  }
}


#!/usr/bin/python
import psycopg2
import sys

def main():
	#Define our connection string
	conn_string = "host='localhost' dbname='my_database' user='postgres' password='secret'"

	# print the connection string we will use to connect
	print "Connecting to database\n	->%s" % (conn_string)

	# get a connection, if a connect cannot be made an exception will be raised here
	conn = psycopg2.connect(conn_string)

	# conn.cursor will return a cursor object, you can use this cursor to perform queries
	cursor = conn.cursor()
	print "Python Connected to Postgres!\n"

if __name__ == "__main__":
	main()

