import sqlalchemy
from sqlalchemy import create_engine
"""Instantiate a DBStorage object"""
SC_MYSQL_USER = "ellis"
SC_MYSQL_PWD = "Toshib123"
SC_MYSQL_HOST = "localhost"
SC_MYSQL_DB = "sprout_collab_db"
SC_MYSQL_PORT = 3306


db_url = f"mysql+mysqldb://{SC_MYSQL_USER}:{SC_MYSQL_PWD}@{SC_MYSQL_HOST}/{SC_MYSQL_DB}"
