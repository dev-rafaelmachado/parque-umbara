import bcrypt
from flask import Flask, jsonify, request
from db import insertQuery, selectQuery, callProcedure

app = Flask(__name__)

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
            return jsonify({'error': 'Usuário inexistente.'}), 400
        
        stored_password = userData[0][0]
        
        if bcrypt.checkpw(dados['senha'].encode('utf-8'), stored_password.encode('utf-8')):
            return jsonify({
                "cpf": userData[0][1],
            })
            
        return jsonify({'error': 'Senha incorreta'}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
