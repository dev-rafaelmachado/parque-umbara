import bcrypt
from flask import Flask, jsonify, request
from flask_cors import CORS
<<<<<<< HEAD
from db import selectQuery, callProcedure, insertQuery
from mqtt import Mqtt, config, topics
from flask_socketio import SocketIO
import json


=======
from db import selectQuery, callProcedure
>>>>>>> 19d71139ca86484dc37398c179bcb766ffb3e17c

app = Flask(__name__)
# Config
app.config['MQTT_BROKER_URL'] = config['url']
app.config['MQTT_BROKER_PORT'] = config['port']
app.config['MQTT_USERNAME'] = config['username']
app.config['MQTT_PASSWORD'] = config['password']
app.config['MQTT_REFRESH_TIME'] = config['refreshTime']
mqtt = Mqtt(app)
socketio = SocketIO(app, cors_allowed_origins='*')
# CORS
CORS(app)

@app.route('/cadastro', methods=['POST'])
def cadastro():
    try:
        dados = request.get_json()
        
        if selectQuery("SELECT * FROM person WHERE cpf = %s", (dados['cpf'],)) or selectQuery("SELECT * FROM person WHERE email = %s", (dados['email'],)):
            return jsonify({'error': 'Usuário já existente.'}), 400
        
        hashed_password = bcrypt.hashpw(dados['senha'].encode('utf-8'), bcrypt.gensalt())

        callProcedure("cadastrar_usuario", (dados['cpf'], dados['nome'], hashed_password, dados['email'], dados['sexo'], dados['data_nasc']))
        
        return jsonify({'message': 'Usuário cadastrado com sucesso.'}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        dados = request.get_json()
        
        userData = selectQuery("SELECT senha, cpf FROM person WHERE email = %s", (dados['email'],))
        if not userData:
            return jsonify({'error': 'Usuário inexistente.'}), 401
        
        stored_password = userData[0][0]
        
        if bcrypt.checkpw(dados['senha'].encode('utf-8'), stored_password.encode('utf-8')):
            return jsonify({
                "cpf": userData[0][1],
            })
            
        return jsonify({'error': 'Senha incorreta'}), 401
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clients', methods=['GET'])
def clients():
    try:
        raw_clients = selectQuery("Select * from person")
        
        clients = []
        for client in raw_clients:
            clients.append({
                "cpf": client[0],
                "nome": client[1],
                "email": client[3],
                "sexo": client[4],
                "data_nasc": client[5],
            })
            
        
        return clients, 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@mqtt.on_connect()
def handle_mqtt_connect(client, userdata, flags, rc):
    mqtt.subscribe(topics[0])
    mqtt.subscribe(topics[1])
    
@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )
    if data['topic'] == topics[1]:
        dados = json.loads(data['payload'])
        insertQuery("INSERT INTO uni_location (id_bangle, cordenada, data_registro)VALUES (%s, POINT(%s, %s), NOW())",(dados['id'], dados['longitude'], dados['latitude']))
        socketio.emit('dados_gps', data['payload'] , namespace='/')

@socketio.on('connect')
def handle_socketio_connect():
    print('Cliente conectado')

if __name__ == '__main__':
    socketio.run(app, debug=True)
