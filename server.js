const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(cors())

// =========================
// CONEXÃO COM MONGO
// =========================
mongoose.connect("mongodb+srv://anabferreira36_db_user:dGpVSLDRrWNNXaaY@cluster0.vpqoobt.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.log(err))

// =========================
// MODELOS
// =========================

const Usuario = mongoose.model("Usuario", new mongoose.Schema({
  nome:  String,
  email: String,
  curso: String,
  senha: String,
}))

const Post = mongoose.model("Post", new mongoose.Schema({
  usuarioId:   String,
  usuarioNome: String,
  conteudo:    String,
  imagem:      String,
  video:       String,
  likes:    { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares:   { type: Number, default: 0 },
  criadoEm: { type: Date, default: Date.now },
}))

const Curtida = mongoose.model("Curtida", new mongoose.Schema({
  usuarioEmail: String,
  postId:       String,
  criadoEm: { type: Date, default: Date.now },
}))

const ProjetoSalvo = mongoose.model("ProjetoSalvo", new mongoose.Schema({
  usuarioEmail: String,
  projetoId:    String,
  titulo:    String,
  descricao: String,
  tags:      [String],
  emoji:     String,
  criadoEm: { type: Date, default: Date.now },
}))

// =========================
// USUÁRIOS
// =========================
app.post("/usuarios", async (req, res) => {
  try {
    const usuario = new Usuario({ nome: req.body.nome, email: req.body.email, curso: req.body.curso, senha: req.body.senha })
    await usuario.save()
    res.json({ sucesso: true, mensagem: "Usuário criado com sucesso" })
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.find()
  res.json(usuarios)
})

app.delete("/usuarios/:id", async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id)
  res.json({ sucesso: true })
})

app.put("/usuarios/:id", async (req, res) => {
  await Usuario.findByIdAndUpdate(req.params.id, req.body)
  res.json({ sucesso: true })
})

app.post("/login", async (req, res) => {
  const { nome, senha } = req.body
  const usuario = await Usuario.findOne({ nome, senha })
  if (!usuario) return res.status(401).json({ erro: "Usuário ou senha inválidos" })
  res.json({ sucesso: true, usuario })
})

// =========================
// POSTS
// =========================
app.post("/posts", async (req, res) => {
  try {
    const post = new Post({
      usuarioId:   req.body.usuarioId,
      usuarioNome: req.body.usuarioNome,
      conteudo:    req.body.conteudo,
      imagem:      req.body.imagem || null,
      video:       req.body.video  || null,
    })
    await post.save()
    res.json({ sucesso: true, post })
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ criadoEm: -1 }).limit(50)
    res.json(posts)
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

app.get("/posts/usuario/:usuarioEmail", async (req, res) => {
  try {
    const posts = await Post.find({ usuarioId: req.params.usuarioEmail }).sort({ criadoEm: -1 })
    res.json(posts)
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

app.delete("/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    await Curtida.deleteMany({ postId: req.params.id })
    res.json({ sucesso: true })
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

// =========================
// CURTIDAS
// =========================
app.post("/curtidas/toggle", async (req, res) => {
  try {
    const { usuarioEmail, postId } = req.body
    const existente = await Curtida.findOne({ usuarioEmail, postId })
    if (existente) {
      await Curtida.deleteOne({ _id: existente._id })
      await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } })
      return res.json({ sucesso: true, acao: 'descurtido' })
    } else {
      await new Curtida({ usuarioEmail, postId }).save()
      await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } })
      return res.json({ sucesso: true, acao: 'curtido' })
    }
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

app.get("/curtidas/:usuarioEmail", async (req, res) => {
  try {
    const curtidas = await Curtida.find({ usuarioEmail: req.params.usuarioEmail })
    res.json(curtidas)
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

// =========================
// PROJETOS SALVOS
// =========================
app.post("/projetos-salvos/toggle", async (req, res) => {
  try {
    const { usuarioEmail, projetoId, titulo, descricao, tags, emoji } = req.body
    const existente = await ProjetoSalvo.findOne({ usuarioEmail, projetoId: String(projetoId) })
    if (existente) {
      await ProjetoSalvo.deleteOne({ _id: existente._id })
      return res.json({ sucesso: true, acao: 'removido' })
    } else {
      await new ProjetoSalvo({ usuarioEmail, projetoId: String(projetoId), titulo: titulo || '', descricao: descricao || '', tags: tags || [], emoji: emoji || 'U+1F4C2' }).save()
      return res.json({ sucesso: true, acao: 'salvo' })
    }
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

app.get("/projetos-salvos/:usuarioEmail", async (req, res) => {
  try {
    const salvos = await ProjetoSalvo.find({ usuarioEmail: req.params.usuarioEmail }).sort({ criadoEm: -1 })
    res.json(salvos)
  } catch (err) { res.status(500).json({ erro: err.message }) }
})

// =========================
// SERVIDOR
// =========================
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})