from datetime import datetime
import secrets
from flask import request
from flask.json import jsonify
from . import app
from .connect import connection
from datetime import datetime

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

    test = request.args.get("test")
    fromDate = request.args.get('fromdate')
    toDate = request.args.get('todate')

    table = ""
    if test == "regnesjekk":
        table = "kompetanse_norge_regnesjek"
    elif test == "datasjekk":
        table = "kompetanse_norge_datasjek"
    elif test == "leseskrivesjekk":
        table = "kompetanse_norge_lesing_skrivesjek"
    elif test == "lesetesten":
        table = "kompetanse_norge"

    inFormat = '%b %d %Y'
    outFormat = '%Y-%m-%d'

    fromDate = " ".join(fromDate.split(" ", 4)[1:4])
    fromDate = datetime.strptime(fromDate, inFormat)
    fromDate = datetime.strftime(fromDate, outFormat)

    toDate = " ".join(toDate.split(" ", 4)[1:4])
    toDate = datetime.strptime(toDate, inFormat)
    toDate = datetime.strftime(toDate, outFormat)

    print(fromDate)
    print(toDate)

    useQuery = "USE " + table + ";"
    selectQuery = "SELECT * FROM itemdata WHERE datecreated >= '" + fromDate + "' AND datecreated <= '" + toDate + "';"

    cursor, conn = connection()
    query = cursor.execute(useQuery+selectQuery, multi=True)

    result = None

    for cur in query:
        print("cursor", cur)
        if cur.with_rows:
            result = [dict((cur.description[i][0], value)
                for i, value in enumerate(row)) for row in cur.fetchall()]

    conn.commit()
    conn.close()

    return jsonify(result), 201
