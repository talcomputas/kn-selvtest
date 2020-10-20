from flask import Flask
from .identity import az_get_secret
import mysql.connector
from mysql.connector import errorcode

app = Flask(__name__)  # Create an instance of the class for our use


""" config = {
    "host": az_get_secret("db-host").value,
    "user": az_get_secret("db-admin").value,
    "password": az_get_secret("db-admin-password").value,
    "database": az_get_secret("db-name").value,
}
try:
    conn = mysql.connector.connect(**config)
    print("Connection established")
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with the user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
 """