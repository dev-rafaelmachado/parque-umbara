import mysql.connector

# ^ Conexão com o BD
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="parque_umbara",
    connect_timeout=60,
)


def insertQuery(query, params=None):
    cursor = db.cursor()

    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)

    db.commit()
    cursor.close()


def selectQuery(query, params=None):
    cursor = db.cursor()

    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)

    results = cursor.fetchall()
    cursor.close()

    return results


def callProcedure(name, parameters):
    cursor = db.cursor()

    cursor.callproc(name, parameters)
    db.commit()

    results = []
    for result in cursor.stored_results():
        results.extend(result.fetchall())

    cursor.close()

    return results
