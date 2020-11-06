from datetime import datetime
import secrets
from flask import request
from flask.json import jsonify
from . import app
from .connect import connection

import json


@app.route("/")
def home():
    return jsonify({"index": "home"}), 200


@app.route("/api/ping")
def pong():

    return (
        jsonify({"AppSecret": "pong"}),
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
    itemid = request.args.get("itemid")
    answer = request.args.get("answer")
    correctanswer = request.args.get("correctanswer")
    correct = request.args.get("correct")
    time = int(request.args.get("time"))
    totaltime = int(request.args.get("totaltime"))
    ver = request.args.get("ver", "")
    timeout = request.args.get("timeout")
    name = request.args.get("name")

    cursor, conn = connection()
    cursor.execute(
        "INSERT INTO itemdata (id, uid, itemid, answer, correct, time, datecreated, correctanswer, totaltime, ver, timeout, name) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (
            id,
            uid,
            itemid,
            answer,
            correct,
            time,
            datecreated,
            correctanswer,
            totaltime,
            ver,
            timeout,
            name,
        ),
    )
    conn.commit()
    cursor.close()

    return jsonify(id=id), 201

@app.route("/api/itemdata", methods=["GET"])
def itemdata():
    token = secrets.token_hex(18)

    cursor, conn = connection()
    query = cursor.execute("USE kompetanse_norge_regnesjek; SELECT * from itemdata LIMIT 3", multi=True)

    result = None

    for cur in query:
        print("cursor", cur)
        if cur.with_rows:
            result = [dict((cur.description[i][0], value)
                for i, value in enumerate(row)) for row in cur.fetchall()]
            print(result)

    conn.commit()
    conn.close()

    return jsonify(result), 201
