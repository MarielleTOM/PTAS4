const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

async function main() {
    const usuario = await prisma.usuario.create({
        data:{
            nome:"Ani",
            email: "anii@example.com",
            password:"senha345",
            tipo:"cliente"
        },
    });

console.log("Novo Usuário:" + JSON.stringify(usuario));

const usuarios = await prisma.usuario.findMany();
console.log("Usuários: ");
console.log(usuarios);
}

 main();


/*const express = require ('express');
const app = express();

//Responde a qualuqer requisição encaminhada para 
// /auth/algumaCoisa 
const authRoutes = require("./routes/authRoutes")
app.use("/auth", authRoutes)

app.listen(8000);*/