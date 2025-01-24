const prisma = require("./prisma/prismaClient");
const express = require ('express');

const app = express();
app.use(express.json());

const cors= require("cors");
app.use(cors());

//Responde a qualuqer requisição encaminhada para 
// /auth/algumaCoisa 
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const mesaRoutes = require("./routes/mesaRoutes");
app.use("/mesa", mesaRoutes);

const reservaRoutes = require("./routes/reservaRoutes");
const AuthController = require("./controllers/AuthController");
app.use("/reservas", AuthController.autenticar, reservaRoutes);

app.get("/meus-pedidos", (req, res) => {
    res.send("Veja seus pedidos abaixo:");
});

app.get("/pedidos/55845125", (req, res) => {});

app.get("/meu-perfil", (req, res) => {});



app.listen(8000);