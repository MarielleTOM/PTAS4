const prisma = require("./prisma/prismaClient");
const express = require('express');

const cors = require("cors");
const AuthController = require("./controllers/AuthController")

const app = express();
app.use(express.json());

app.use(cors());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const perfilRoutes = require("./routes/perfilRoutes");
app.use("/perfil", AuthController.verificaAutenticacao, perfilRoutes);

const mesaRoutes = require("./routes/mesaRoutes");
app.use("/mesa", mesaRoutes);

const reservaRoutes = require("./routes/reservaRoutes");
app.use("/reservas", AuthController.verificaAutenticacao, reservaRoutes);

app.get("/meus-pedidos", (req, res) => {
    res.send("Veja seus pedidos abaixo:");
});

app.get("/pedidos/55845125", (req, res) => { });

app.get("/meu-perfil", (req, res) => { });

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});