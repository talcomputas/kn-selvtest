from datetime import datetime
import secrets
from flask import request
from flask.json import jsonify
from . import app
from .identity import az_get_secret
from .connect import connection


@app.route("/")
def home():
    return jsonify({"index": "home"}), 200


@app.route("/api/ping")
def pong():

    AppSecret = az_get_secret("AppSecret").value
    return (
        jsonify({"AppSecret": AppSecret}),
        200,
    )


@app.route("/api/submituser", methods=["GET", "POST"])
def submitUser():
    token = secrets.token_hex(18)
    now = datetime.utcnow()
    formatted = now.strftime("%Y-%m-%d %H:%M:%S")

    cursor, conn = connection()
    cursor.execute("INSERT INTO user(id, created) VALUES (%s, %s)", (token, formatted))
    conn.commit()
    cursor.close()

    return jsonify(id=token), 201


@app.route("/api/submititem", methods=["GET", "POST"])
def submitItem():

    id = secrets.token_hex(18)
    now = datetime.utcnow()
    datecreated = now.strftime("%Y-%m-%d %H:%M:%S")

    uid = request.args.get("uid")
    itemId = request.args.get("itemId")
    answer = request.args.get("answer")
    correct = request.args.get("correct")
    correctanswer = request.args.get("correctanswer")
    time = int(request.args.get("time"))
    totaltime = int(request.args.get("totaltime"))
    ver = request.args.get("ver")
    timeout = request.args.get("timeout")

    cursor, conn = connection()
    cursor.execute(
        "INSERT INTO itemdata (id, uid, itemid, answer, correct, time, datecreated, correctanswer, totaltime, ver, timeout) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (
            id,
            uid,
            itemId,
            answer,
            correct,
            time,
            datecreated,
            correctanswer,
            totaltime,
            ver,
            timeout,
        ),
    )
    conn.commit()
    cursor.close()

    return jsonify(id=id), 201