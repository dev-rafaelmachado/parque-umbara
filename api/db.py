import mysql.connector

# ^ Conexão com o BD
db = mysql.connector.connect(
<<<<<<< HEAD
    host='localhost',
    user='root',
    password='PUC@1234',
=======
    host='db4free.net',
    user='devrafael',
    password='safe@kids',
>>>>>>> 19d71139ca86484dc37398c179bcb766ffb3e17c
    database='parque_umbara'
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
    
    cursor.close()