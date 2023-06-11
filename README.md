# parque-umbara

<img src="./frontend/src/static/logo.svg">

O parque-umbara é uma aplicação para gerenciamento e reserva serviços do Parque Umbara como o Safe Kids

## Funcionalidades
- Gerenciamento do serviço - Safe Kids:
  - Adicionar pulseir;
  - Acesso a sua localização;
  - Ligar o alerta;
  - Apagar pulseira.
- Gerenciamento de usuários
  - Listagem;
  - Cadastro.

---

### Banco de dados
O banco de dados do Parque Umbará é MySQL rodando em LocalHost pois isto é um protótipo. Para inicar o banco suba um servidor MySQL nativo ou com algum programa de 3º (Recomendamos: XAMPP), e rodar o script que se encontra na pasta `./bd/create-script.sql`

### API
A API do Parque Umabará foi feita em python com Flask, ela roda em localhost também. Para inicia-lá basta seguir estes passos:

- Abra a pasta: `./api/`
- Rode estes comandos no terminal:
```bash
pip install -r requirements.txt
python app.py
```
### Site (React)
O site do Parque Umbará é desenvolvido usando React e está hospedado no Netlify. O site é implantado automaticamente a partir do repositório no GitHub. Ao fazer push para a branch principal, o Netlify realiza uma nova construção e implantação do site. O site pode ser acessado na seguinte URL:

- URL do Site: [https://parque-umbara.netlify.app/](https://parque-umbara.netlify.app/)

#### Caso prefira roda-lo em LocalHost siga estes passos:

- Tenha o Node.js instalado juntamento com o Yarn
- Abra a pasta: "./frontend" em seu terminal
- Execute o comando:
```bash
yarn
```
- Aguarde ele instalar todas as dependencias e execute o comando
```bash
yarn start
```
- Pronto, agora a aplicação esta rodando em seu localhost

<br>

---

## Documentação da API
A API do Parque Umbará (Versão - 0.0.2), permite interagir com o cadastro e login e listagem de usuários

### Recursos:
<br>
<h4> <strong> Login </strong> </h4>

Endpoint
```bash
POST /login
```
Esta rota é usada para autenticar um usuário e obter o seu CPF. Os detalhes de autenticação são enviados no corpo da solicitação como um objeto JSON contendo as credenciais do usuário.

Exemplo de corpo da solicitação:
```json
{
  "email": "joao@email.com",
  "senha": "Abc@123"
}
```
A resposta será um objeto JSON contendo o CPF que pode ser utilizado para consultas subsequentes.
```json
{
  "cpf": "001.002.003-04"
}
```

Exemplo de resposta de erro:

Caso o email do usuário não esteja vinculado a nenhum usuário registrado, uma resposta de erro será retornada.
```json
{
  "error": "Usuário inexistente."
}
```
Caso a senha do usuário não seja condizente com a cadastrada no banco, uma resposta de erro será retornada. 
```json
{
  "error": "Senha incorreta"
}
```
<br>
<h4> <strong> Cadastro </strong> </h4>

Endpoint
```bash
POST /cadastro
```
Esta rota é usada para cadastrar um novo usuário. Os detalhes do cadastro são enviados no corpo da solicitação como um objeto JSON contendo as informações do cadastro.

Exemplo de corpo da solicitação:
```json
{
  {
    "cpf": "001.002.003-04",
    "nome": "João",
    "senha": "Abc@123",
    "email": "joao@email.com",
    "sexo": "m",
    "data_nasc": "2000-12-31"
  }
}
```
Caso tudo ocorra bem uma resosta de status code 201 é retornada.
```json
{
  "message": "Usuário cadastrado com sucesso."
}

```

Exemplo de resposta de erro:
Caso o email ou o cpf do cadastro já esteja vinculado a outro usuário, uma resposta de erro será retornada.
```json
{
  "error": "'Usuário já existente."
}
```

<br>
<h4> <strong> Listagem </strong> </h4>

Endpoint
```bash
POST /clients
```
Retorna a lista de todos os usuários cadastrados.

Exemplo de Resposta
```json
[
  {
    "cpf": "001.002.003-04",
    "nome": "João",
    "email": "joao@email.com",
    "sexo": "m",
    "data_nasc": "2000-12-31"
  },
  {
    "cpf": "004.003.002-01",
    "nome": "Maria",
    "email": "maria@email.com",
    "sexo": "f",
    "data_nasc": "2001-01-01"
  },
]
```

<br>
<h4> <strong> Listagem de Pulseiras </strong> </h4>
Endpoint

```bash
POST /list_bangles
```

Esta rota é usada para obter a lista de pulseiras associadas a um determinado usuário. Os detalhes do usuário são enviados no corpo da solicitação como um objeto JSON contendo o CPF do usuário.

Exemplo de corpo da solicitação:

```json
{
  "cpf": "001.002.003-04"
}
```

A resposta será um objeto JSON contendo a lista de pulseiras do usuário.

Exemplo de resposta:

```json
[
  {
    "id_bangle": 1
  },
  {
    "id_bangle": 2
  }
]
```
Caso ocorra algum erro durante a busca das pulseiras, uma resposta de erro será retornada.

Exemplo de resposta de erro:

```json
{
  "error": "Mensagem de erro"
}
```
<br>
<h4> <strong> Cadastro de Pulseira </strong> </h4>

Endpoint

```bash
POST /insert_register
```

Esta rota é usada para cadastrar uma nova pulseira para um determinado usuário. Os detalhes da pulseira e do usuário são enviados no corpo da solicitação como um objeto JSON contendo o CPF do usuário e o ID da pulseira.

Exemplo de corpo da solicitação:

```json
{
  "cpf": "001.002.003-04",
  "id_bangle": 3
}
```

Caso tudo ocorra bem, uma resposta de status code 201 é retornada.

Exemplo de resposta:

```json
{
  "message": "Pulseira cadastrada com sucesso"
}
```
Caso a pulseira já esteja cadastrada para o usuário, uma resposta de erro será retornada.

Exemplo de resposta de erro:

```json
{
  "error": "Pulseira já cadastrada"
}
```

<br>
<h4> <strong> Remoção de Pulseira </strong> </h4>

Endpoint

```bash
POST /remove_bangle
```

Esta rota é usada para remover uma pulseira de um determinado usuário. Os detalhes da pulseira e do usuário são enviados no corpo da solicitação como um objeto JSON contendo o CPF do usuário e o ID da pulseira.

Exemplo de corpo da solicitação:

```json
{
  "cpf": "001.002.003-04",
  "id_bangle": 3
}
```

Caso tudo ocorra bem, uma resposta de status code 201 é retornada.

Exemplo de resposta:

```json
{
  "message": "Pulseira removida com sucesso"
}
```

Caso a pulseira não seja encontrada para o usuário, uma resposta de erro será retornada.

Exemplo de resposta de erro:

```json
{
  "error": "Pulseira não encontrada"
}
```

<br>
<h4> <strong> Ligação do Alerta de Pulseira </strong> </h4>

Endpoint
```bash
POST /alert_on
```

Esta rota é usada para ligar o alerta de uma pulseira. Os detalhes da pulseira e do usuário são enviados no corpo da solicitação como um objeto JSON contendo o CPF do usuário e o ID da pulseira.

Exemplo de corpo da solicitação:

```json
{
  "cpf": "001.002.003-04",
  "id_bangle": 3
}
```

Caso tudo ocorra bem, uma resposta de status code 201 é retornada.

Exemplo de resposta:

```json
{
  "message": "Registro inserido na tabela alert com sucesso."
}
```
Caso ocorra algum erro durante a ligação do alerta, uma resposta de erro será retornada.

Exemplo de resposta de erro:
```json
{
  "error": "Mensagem de erro"
}
```

<br>
<h4> <strong> Desligamento do Alerta de Pulseira </strong> </h4>

Endpoint
```bash
POST /alert_off
```

Esta rota é usada para desligar o alerta de uma pulseira. Os detalhes da pulseira e do usuário são enviados no corpo da solicitação como um objeto JSON contendo o CPF do usuário e o ID da pulseira.

Exemplo de corpo da solicitação:
```json
{
  "cpf": "001.002.003-04",
  "id_bangle": 3
}
```

Caso tudo ocorra bem, uma resposta de status code 201 é retornada.

Exemplo de resposta:
```json
{
  "message": "Alerta fechado com sucesso."
}
```
Caso ocorra algum erro durante o desligamento do alerta, uma resposta de erro será retornada.

Exemplo de resposta de erro:

```json
{
  "error": "Mensagem de erro"
}
```
<br>
<h4> <strong> Conexão SocketIO </strong> </h4>

Endpoint
```bash
SocketIO /connect
```

Esta rota é usada para lidar com a conexão do SocketIO. Ao estabelecer uma conexão com o SocketIO, o servidor emitirá a mensagem "Cliente conectado".

Essa rota não requer uma solicitação HTTP explícita, mas é ativada automaticamente quando um cliente se conecta ao servidor SocketIO.

Observação: Esta rota utiliza a tecnologia WebSocket para comunicação em tempo real.

## Licença
Este projeto foi desenvoldido no curso BCC da PUCPR para a matéria: Experiência Criativa: Criando Soluções Computacionais. 

Este projeto está licenciado sob a MIT License.