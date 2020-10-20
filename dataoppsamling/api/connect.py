from .identity import az_get_secret
import mysql.connector
from mysql.connector import Error


def connection():
    """ Connect to MySQL database """
    conn = None
    try:
        conn = mysql.connector.connect(
            host=az_get_secret("db-host").value,
            database=az_get_secret("db-name").value,
            user=az_get_secret("db-admin").value,
            password=az_get_secret("db-admin-password").value,
        )
        if conn.is_connected():
            print("Connected to MySQL database")

    except Error as e:
        print(e)

    # finally:
    #    if conn is not None and conn.is_connected():
    #        conn.close()
    cursor = conn.cursor()
    return cursor, conn


# if __name__ == "__main__":
#    connect()