## Started converting to python (3.8.5, same as on Azure as this writing)

# Startup

* cd dataoppsamling
* python3.8 -m venv venv
* source venv/bin/activate
* gunicorn --reload --bind=localhost:5000 startup:app