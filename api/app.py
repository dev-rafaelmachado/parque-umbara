import bcrypt
from flask import Flask, jsonify, request
from flask_cors import CORS
from db import selectQuery, callProcedure, insertQuery
from mqtt import Mqtt, config, topics
from flask_socketio import SocketIO
import json

app = Flask(__name__)
# Configuração do Flask
app.config["MQTT_BROKER_URL"] = config["url"]
app.config["MQTT_BROKER_PORT"] = config["port"]
app.config["MQTT_USERNAME"] = config["username"]
app.config["MQTT_PASSWORD"] = config["password"]
app.config["MQTT_REFRESH_TIME"] = config["refreshTime"]
mqtt = Mqtt(app)
socketio = SocketIO(app, cors_allowed_origins="*")
# CORS
CORS(app)


# Lidar com a conexão MQTT
@mqtt.on_connect()
def handle_mqtt_connect(client, userdata, flags, rc):
    mqtt.subscribe(topics[0])
    mqtt.subscribe(topics[1])


# Lidar com a mensagem MQTT recebida
@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(topic=message.topic, payload=message.payload.decode())
    if data["topic"] == topics[1]:
        dados = json.loads(data["payload"])
        # insertQuery(
        #     "INSERT INTO uni_location (id_bangle, cordenada, data_registro)VALUES (%s, POINT(%s, %s), NOW())",
        #     (dados["id"], dados["longitude"], dados["latitude"]),
        # )
        socketio.emit("dados_gps", data["payload"], namespace="/")


# Endpoint para cadastrar um usuário
@app.route("/cadastro", methods=["POST"])
def cadastro():
    try:
        dados = request.get_json()

        if selectQuery(
            "SELECT * FROM person WHERE cpf = %s", (dados["cpf"],)
        ) or selectQuery("SELECT * FROM person WHERE email = %s", (dados["email"],)):
            return jsonify({"error": "Usuário já existente."}), 400

        hashed_password = bcrypt.hashpw(
            dados["senha"].encode("utf-8"), bcrypt.gensalt()
        )

        callProcedure(
            "cadastrar_usuario",
            (
                dados["cpf"],
                dados["nome"],
                hashed_password,
                dados["email"],
                dados["sexo"],
                dados["data_nasc"],
            ),
        )

        return jsonify({"message": "Usuário cadastrado com sucesso."}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint para realizar login
@app.route("/login", methods=["POST"])
def login():
    try:
        dados = request.get_json()

        userData = selectQuery(
            "SELECT senha, cpf FROM person WHERE email = %s", (dados["email"],)
        )
        if not userData:
            return jsonify({"error": "Usuário inexistente."}), 401

        stored_password = userData[0][0]

        if bcrypt.checkpw(
            dados["senha"].encode("utf-8"), stored_password.encode("utf-8")  # type: ignore
        ):
            return jsonify(
                {
                    "cpf": userData[0][1],
                }
            )

        return jsonify({"error": "Senha incorreta"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint para obter a lista de clientes
@app.route("/clients", methods=["GET"])
def clients():
    try:
        raw_clients = selectQuery("Select * from person")

        clients = []
        for client in raw_clients:
            clients.append(
                {
                    "cpf": client[0],
                    "nome": client[1],
                    "email": client[3],
                    "sexo": client[4],
                    "data_nasc": client[5],
                }
            )

        return clients, 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint para obter a lista de pulseiras
@app.route("/list_bangles", methods=["POST"])
def list_bangles():
    try:
        dados = request.get_json()
        raw_bangles = selectQuery(
            "select id_bangle from parque_umbara.register where cpf_client = %s and data_fechado is null",
            (dados["cpf"],),
        )

        bangles = []
        for bangle in raw_bangles:
            bangles.append(
                {
                    "id_bangle": bangle[0],
                }
            )

        return jsonify(bangles), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint para cadastrar uma nova pulseira
@app.route("/insert_register", methods=["POST"])
def insert_register():
    try:
        dados = request.get_json()
        isRegister = selectQuery(
            "select id from parque_umbara.register where cpf_client = %s and id_bangle = %s and data_fechado is null",
            (dados["cpf"], dados["id_bangle"]),
        )

        if isRegister:
            return jsonify({"error": "Pulseira já cadastrada"}), 401

        insertQuery(
            "insert into parque_umbara.register (cpf_client, id_bangle, data_aberto) values (%s, %s, now())",
            (dados["cpf"], dados["id_bangle"]),
        )

        return jsonify({"message": "Pulseira cadastrada com sucesso"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint para remover uma pulseira
@app.route("/remove_bangle", methods=["POST"])
def remove_bangle():
    try:
        dados = request.get_json()
        isRegister = selectQuery(
            "select id from parque_umbara.register where cpf_client = %s and id_bangle = %s and data_fechado is null",
            (dados["cpf"], dados["id_bangle"]),
        )

        if not isRegister:
            return jsonify({"error": "Pulseira não encontrada"}), 401

        insertQuery(
            "UPDATE parque_umbara.register SET data_fechado = now() where cpf_client = %s and id_bangle = %s and data_fechado is null",
            (dados["cpf"], dados["id_bangle"]),
        )

        return jsonify({"message": "Pulseira removida com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint para ligar o alerta de uma pulseira
@app.route("/alert_on", methods=["POST"])
def alert_on():
    try:
        dados = request.get_json()
        data = callProcedure("insert_alert", (dados["cpf"], dados["id_bangle"]))

        if data[0][0] != "Registro inserido na tabela alert com sucesso.":
            return jsonify({"error": data[0][0]}), 401

        message = f"id{dados['id_bangle']}:Ligar Alerta"
        mqtt.publish(topics[0], message.encode("utf-8"))

        return jsonify({"message": data[0][0]}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint para desligar o alerta de uma pulseira
@app.route("/alert_off", methods=["POST"])
def alert_off():
    try:
        dados = request.get_json()
        data = callProcedure("close_alert", (dados["cpf"], dados["id_bangle"]))

        if data[0][0] != "Alerta fechado com sucesso.":
            return jsonify({"error": data[0][0]}), 401

        message = f"id{dados['id_bangle']}:Desligar Alerta"
        mqtt.publish(topics[0], message.encode("utf-8"))

        return jsonify({"message": data[0][0]}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Lidar com a conexão do SocketIO
@socketio.on("connect")
def handle_socketio_connect():
    print("Cliente conectado")


if __name__ == "__main__":
    socketio.run(app, debug=True)
