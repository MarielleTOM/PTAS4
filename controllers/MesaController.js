const prisma = require("../prisma/prismaClient");

class MesaController {
  static async novaMesa(req, res) {
    try {
      const { codigo, n_lugares } = req.body;
      
      if (!codigo || !n_lugares) {
        return res.status(400).json({ mensagem: "Os campos 'codigo' e 'n_lugares' são obrigatórios." });
      }
      const novaMesa = await prisma.mesa.create({
        data: {
          codigo,
          n_lugares: parseInt(n_lugares),
        },
      });
      return res.status(201).json({
        mensagem: "Mesa cadastrada com sucesso!",
        mesa: novaMesa,
      });
    } catch (error) {
      console.error("Erro ao cadastrar mesa:", error);
      return res.status(500).json({
        mensagem: "Erro ao cadastrar mesa. Tente novamente mais tarde.",
        erro: error.message,
      });
    }
  }

  // Buscar Mesas
  static async buscarMesas(req, res) {
    try {
      const mesas = await prisma.mesa.findMany();
      return res.status(200).json({
        mensagem: "Mesas carregadas com sucesso!",
        mesas,
      });
    } catch (error) {
      console.error("Erro ao buscar mesas:", error);
      return res.status(500).json({
        mensagem: "Erro ao buscar mesas. Tente novamente mais tarde.",
        erro: error.message,
      });
    }
  }

  // Consultar Mesas Disponíveis por Data
  static async consultarDisponibilidade(req, res) {
    try {
      const { data } = req.query;
      if (!data) {
        return res.status(400).json({ mensagem: "O campo 'data' é obrigatório." });
      }
      const mesas = await prisma.mesa.findMany({
        include: {
          reservas: {
            where: {
              data: new Date(data),
            },
          },
        },
      });
      return res.status(200).json({
        mensagem: "Mesas disponíveis consultadas com sucesso!",
        mesas,
      });
    } catch (error) {
      console.error("Erro ao consultar disponibilidade:", error);
      return res.status(500).json({
        mensagem: "Erro ao consultar disponibilidade. Tente novamente mais tarde.",
        erro: error.message,
      });
    }
  }
}
module.exports = MesaController;
