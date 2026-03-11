const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://anabferreira36_db_user:dGpVSLDRrWNNXaaY@cluster0.vpqoobt.mongodb.net/?appName=Cluster0")

.then(() => {
    console.log("MongoDB conectado com sucesso!")
})
.catch((err) => {
    console.log("Erro ao conectar:", err)
})