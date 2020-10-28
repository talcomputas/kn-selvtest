from flask import Flask
from flask_cors import CORS

app = Flask(__name__)  # Create an instance of the class for our use
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})