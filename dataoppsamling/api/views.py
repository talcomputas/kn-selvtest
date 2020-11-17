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

    return jsonify(getDataBetweenDates(fromDate, toDate, test)), 201

@app.route("/api/totaltestsperday", methods=["GET"])
def summary(): 
    fromDate = request.args.get('fromdate')
    toDate = request.args.get('todate')

    result = getDataBetweenDates(fromDate, toDate, "alle")

    totTestsPerDay = {}
    uids = []

    for line in result:
        uid = line['uid']
        testName = line['name']
        date = datetime.strftime(line['datecreated'], '%d.%m.%Y')
        if uid not in uids:
            uids.append(uid)
            totTestsPerDay[date] = 0

        if date in totTestsPerDay:
            totTestsPerDay[date] += 1


    return jsonify(totTestsPerDay), 201

def getDataBetweenDates(fromDate, toDate, test): 
    fromDate = formatDate(fromDate)
    toDate = formatDate(toDate)

    useQuery = "USE kompetansenorge;"
    selectQuery = "SELECT * FROM itemdata WHERE "
    if test != "alle":
        selectQuery += "name = '" + test + "' AND "
    selectQuery += "datecreated >= '" + fromDate + "' AND datecreated <= '" + toDate + "';" 

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

    return result

def formatDate(date, nbFormat = False):
    inFormat = '%b %d %Y'
    outFormat = '%Y-%m-%d'
    if nbFormat:
        outFormat = '%d.%m.%Y'
    date = " ".join(date.split(" ", 4)[1:4])
    date = datetime.strptime(date, inFormat)
    return datetime.strftime(date, outFormat)


