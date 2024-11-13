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

app.listen(8000);