const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

// CONEXÃO COM MONGO
mongoose.connect("mongodb+srv://anabferreira36_db_user:dGpVSLDRrWNNXaaY@cluster0.vpqoobt.mongodb.net/?appName=Cluster0")

.then(() => {
    console.log("MongoDB conectado!")
})
.catch((err) => {
    console.log(err)
})

// MODELO DE USUÁRIO
const Usuario = mongoose.model("Usuario", {
    nome: String,
    email: String,
    curso: String,
    senha: String
})

// =========================
// CRIAR USUÁRIO
// =========================
app.post("/usuarios", async (req, res) => {

    const usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        curso: req.body.curso,
        senha: req.body.senha
    })

    await usuario.save()

    res.send("Usuário criado com sucesso")
})

// =========================
// LISTAR USUÁRIOS
// =========================
app.get("/usuarios", async (req, res) => {

    const usuarios = await Usuario.find()

    res.json(usuarios)
})

// =========================
// DELETAR USUÁRIO
// =========================
app.delete("/usuarios/:id", async (req, res) => {

    await Usuario.findByIdAndDelete(req.params.id)

    res.send("Usuário deletado")
})

// =========================
// ATUALIZAR USUÁRIO
// =========================
app.put("/usuarios/:id", async (req, res) => {

    await Usuario.findByIdAndUpdate(req.params.id, req.body)

    res.send("Usuário atualizado")
})

// SERVIDOR
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})
// =========================
// LOGIN USUÁRIO
// =========================
app.post("/login", async (req, res) => {
    const { nome, senha } = req.body

    const usuario = await Usuario.findOne({ nome: nome, senha: senha })

    if (!usuario) {
        return res.status(401).json({ erro: "Usuário ou senha inválidos" })
    }

    res.json({ sucesso: true, usuario })
})