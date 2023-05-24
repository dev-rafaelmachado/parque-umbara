import bcrypt
from flask import Flask, jsonify, request
from flask_cors import CORS
from db import selectQuery, callProcedure

app = Flask(__name__)
CORS(app)

@app.route('/cadastro', methods=['POST'])
def cadastro():
    try:
        dados = request.get_json()
        
        
        if selectQuery("SELECT * FROM person WHERE cpf = %s", (dados['cpf'],)) or selectQuery("SELECT * FROM person WHERE email = %s", (dados['email'],)):
            return jsonify({'error': 'Usuário já existente.'}), 400
        
        # Hash da senha usando bcrypt
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

if __name__ == '__main__':
    app.run(debug=True)
