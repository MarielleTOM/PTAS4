const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AuthController{
    static async cadastro(req, res) {}

    static async login(req, res) {
        res.json({
            email: req.email,
            senha: req.senha,
        });
    }
}

module.exports = AuthController;