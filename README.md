# SENAI Connect

Projeto desenvolvido por **Felipe Zamora** e **Ana Beatriz**.

---

# 📌 Sobre o Projeto

O **SENAI Connect** é uma aplicação web que simula uma **rede social voltada para alunos do SENAI**, permitindo o cadastro e gerenciamento de usuários em um banco de dados.

O objetivo do projeto é praticar conceitos de:

* Desenvolvimento **Front-end**
* Criação de **API com Node.js**
* Integração com **MongoDB**
* Estruturação de projetos web

A aplicação possui uma interface simples desenvolvida em **HTML, CSS e JavaScript**, que se comunica com um **servidor Node.js** responsável por realizar as operações no banco de dados **MongoDB**.

---

# 🚀 Tecnologias Utilizadas

### Front-end

* HTML5
* CSS3
* JavaScript

### Back-end

* Node.js
* Express.js

### Banco de Dados

* MongoDB Atlas
* Mongoose

### Outras dependências

* CORS

---

# 📂 Estrutura do Projeto

```
projeto/
│
├── index.html        # Estrutura da página web
├── style.css         # Estilização da interface
├── script.js         # Lógica da interface e requisições
├── server.js         # Servidor da aplicação e rotas da API
│
├── mongo/
│   └── db.js         # Arquivo responsável pela conexão com o MongoDB
│
└── README.md         # Documentação do projeto
```

---

# 🗄️ Conexão com o Banco de Dados

A conexão com o **MongoDB Atlas** é feita utilizando a biblioteca **Mongoose**.

O arquivo responsável por essa conexão é:

```
mongo/db.js
```

Exemplo da conexão utilizada no projeto:

```javascript
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://usuario:senha@cluster.mongodb.net")

.then(() => {
    console.log("MongoDB conectado com sucesso!")
})
.catch((err) => {
    console.log("Erro ao conectar:", err)
})
```

Esse arquivo é importado pelo servidor para permitir que a aplicação utilize o banco de dados.

---

# ⚙️ Funcionalidades da API

A aplicação possui rotas que permitem realizar operações básicas com os usuários cadastrados.

## Criar usuário

`POST /usuarios`

Cria um novo usuário no banco de dados.

Exemplo de dados enviados:

```
{
  "nome": "felipe",
  "email": "felipe@email.com",
  "curso": "Desenvolvimento de Sistemas",
  "senha": "123456"
}
```

---

## Listar usuários

`GET /usuarios`

Retorna todos os usuários cadastrados no banco.

---

## Atualizar usuário

`PUT /usuarios/:id`

Atualiza as informações de um usuário específico.

---

## Deletar usuário

`DELETE /usuarios/:id`

Remove um usuário do banco de dados.

---

# ▶️ Como Executar o Projeto

## 1️⃣ Clonar o repositório

```
git clone https://github.com/seu-repositorio/projeto.git
```

---

## 2️⃣ Instalar as dependências

Dentro da pasta do projeto execute:

```
npm install
```

Ou instale manualmente:

```
npm install express mongoose cors
```

---

## 3️⃣ Iniciar o servidor

```
node server.js
```

O servidor iniciará em:

```
http://localhost:3000
```

---

## 4️⃣ Abrir o projeto

Abra o arquivo:

```
index.html
```

no navegador para acessar a interface da aplicação.

---

# 👥 Integrantes do Grupo

* **Felipe Zamora**
* **Ana Beatriz**

---

# 🎓 Projeto Acadêmico

Projeto desenvolvido como atividade acadêmica no **SENAI**, com o objetivo de praticar:

* Desenvolvimento Web
* Criação de APIs
* Integração com Banco de Dados
* Uso de Node.js e MongoDB
