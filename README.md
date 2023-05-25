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
## Hospedagem
O Parque Umbará é um projeto que consiste em um Banco de dados MySql, uma API e um site (React) hospedados em diferentes plataformas. A seguir, estão as informações sobre hospedagem do projeto:

### Banco de dados
O banco de dados do Parque Umbará é hospedado no db4free, uma plataforma de hospedagem gratuita de bancos de dados MySQL.

- Usuário: devrafael
- Senha: safe@kids
- Nome do Banco: parque_umbara

### Hospedagem da API

A API do Parque Umbará é hospedada no Render, uma plataforma de hospedagem em nuvem para serviços na WEB. A API é implantada automaticamente a partir do repositório no GitHub. Ao fazer push para a branch principal, a implantação é acionada e a API é atualizada com as alterações mais recentes. A API está disponível na seguinte URL:

- URL da API: [https://parque-umbara-api-wtuk.onrender.com/clients](https://parque-umbara-api-wtuk.onrender.com/)

<br>
<div class="alert" style="background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px;">
    <strong>⚠️ Atenção:</strong> O serviço de hospedagem da API é MUITO lento e a API cai com muita frequencia por isso, caso for testar, sugiro que rode ela na sua máquina local, para fazer isto siga estes passos:
</div>
<br>

- Abra o arquivo: "./api/app.py"
- Rode estes comandos no terminal:
```bash
pip install -r requirements.txt
python app.py
```
- Além disso modifique o arquivo: "./frontend/utils/axios.js"

#### Disto:
```javascript
const api = axios.create({
  baseURL: "https://parque-umbara-api-wtuk.onrender.com",
});
```

Para isto:
```javascript
const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});
```

- Ou utilize este link para testar o site:
  - []()


### Site (React)
O site do Parque Umbará é desenvolvido usando React e está hospedado no Netlify. O site é implantado automaticamente a partir do repositório no GitHub. Ao fazer push para a branch principal, o Netlify realiza uma nova construção e implantação do site. O site pode ser acessado na seguinte URL:

- URL do Site: [https://parque-umbara.netlify.app/](https://parque-umbara.netlify.app/)

<br>

<Strong> Caso queira rodar em sua máquina, segui os seguintes passos: </Strong>

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

## Licença
Este projeto foi desenvoldido no curso BCC da PUCPR para a matéria: Experiência Criativa: Criando Soluções Computacionais. 

Este projeto está licenciado sob a MIT License.