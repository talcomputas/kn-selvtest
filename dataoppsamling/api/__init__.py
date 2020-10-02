from flask import Flask
from .identity import az_get_secret
import mysql.connector

app = Flask(__name__)  # Create an instance of the class for our use

config = {
    "host": az_get_secret("db-host").value,
    "user": az_get_secret("db-admin").value,
    "password": az_get_secret("db-admin-password").value,
    "database": az_get_secret("db-name").value,
}
conn = mysql.connector.connect(**config)
