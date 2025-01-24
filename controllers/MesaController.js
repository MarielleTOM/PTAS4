const prisma = require("../prisma/prismaClient");

class MesaController {
    static async novaMesa(req, res) {
        try {
            // Dados recebidos do corpo da requisição
            const { codigo, n_lugares } = req.body;

            // Validação básica
            if (!codigo || !n_lugares) {
                return res.status(400).json({ mensagem: "Os campos 'codigo' e 'n_lugares' são obrigatórios." });
            }

            // Criação de uma nova mesa no banco de dados
            const novaMesa = await prisma.mesa.create({
                data: {
                    codigo,
                    n_lugares: parseInt(n_lugares), // Certificando que o número de lugares é um inteiro
                },
            });

            // Resposta de sucesso
            return res.status(201).json({
                mensagem: "Mesa cadastrada com sucesso!",
                mesa: novaMesa,
            });
        } catch (error) {
            console.error("Erro ao cadastrar mesa:", error);

            // Tratamento de erro
            return res.status(500).json({
                mensagem: "Erro ao cadastrar mesa. Tente novamente mais tarde.",
                erro: error.message,
            });
        }
    }
}

module.exports = MesaController;
