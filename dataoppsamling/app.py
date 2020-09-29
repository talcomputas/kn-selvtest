import os
import json

from flask import Flask
app = Flask(__name__)

ENVIRONMENT = os.environ
if "Production" in ENVIRONMENT:
    keys = ENVIRONMENT


@app.route("/")
def hello():
    return "Dataoppsamling"


@app.route("/foo")
def test():
    return "Foo value"
