const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient();

async function main () {
    // Insere um usuário
    const novoUsuario = await prisma.usuario.create ({
        data:{
        nome: "José Bezerra",
        email: "joseB@gmail.com"
    }
    });

    console.log("Novo usuário " + JSON.stringify(novoUsuario));

    //Buscar usuario 
    const usuarios= await prisma.usuario.findMany();

    console.log("Todos os usuários: " + JSON.stringify(usuarios))
}

main().catch((erro)=>{
    console.log("Erro: " + erro)
})