# SENAI Connect

Projeto desenvolvido por **Felipe Zamora** e **Ana Beatriz**.

## 📌 Sobre o Projeto

O **SENAI Connect** é uma aplicação web que simula uma rede social voltada para alunos e profissionais do SENAI.
A plataforma permite o cadastro e gerenciamento de usuários, possibilitando conexões entre estudantes, compartilhamento de projetos e oportunidades profissionais.

O sistema possui uma interface web com **HTML, CSS e JavaScript**, e um **backend em Node.js com Express**, conectado a um banco de dados **MongoDB**.

---

## 🚀 Tecnologias Utilizadas

**Front-end**

* HTML5
* CSS3
* JavaScript

**Back-end**

* Node.js
* Express

**Banco de Dados**

* MongoDB
* Mongoose

**Outras bibliotecas**

* CORS

---

## 📂 Estrutura do Projeto

```
/projeto
│
├── index.html      # Estrutura da interface da aplicação
├── style.css       # Estilização da aplicação
├── script.js       # Lógica da interface
├── server.js       # Servidor Node.js e API
└── README.md       # Documentação do projeto
```

---

## ⚙️ Funcionalidades

O sistema possui uma API simples para gerenciamento de usuários.

### Criar usuário

`POST /usuarios`

Cria um novo usuário no banco de dados.

Campos enviados:

* nome
* email
* curso
* senha

---

### Listar usuários

`GET /usuarios`

Retorna todos os usuários cadastrados.

---

### Atualizar usuário

`PUT /usuarios/:id`

Atualiza os dados de um usuário existente.

---

### Deletar usuário

`DELETE /usuarios/:id`

Remove um usuário do banco de dados.

---

## 🗄️ Modelo de Usuário

O banco de dados utiliza o seguinte modelo:

```
Usuario {
  nome: String
  email: String
  curso: String
  senha: String
}
```

---

## ▶️ Como executar o projeto

### 1️⃣ Instalar as dependências

No terminal, dentro da pasta do projeto:

```
npm install express mongoose cors
```

---

### 2️⃣ Executar o servidor

```
node server.js
```

O servidor será iniciado em:

```
http://localhost:3000
```

---

### 3️⃣ Abrir o site

Abra o arquivo:

```
index.html
```

no navegador.

---

## 👥 Integrantes do Grupo

* **Felipe Zamora**
* **Ana Beatriz**

---

## 🎓 Projeto Acadêmico

Projeto desenvolvido para atividades do **SENAI**, com objetivo de praticar:

* Desenvolvimento web
* Criação de APIs
* Integração com banco de dados
* Uso de Node.js e MongoDB
