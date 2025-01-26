const prisma = require("../prisma/prismaClient");

class ReservaController {
  static async registrarReserva(req, res) {
    try {
      const { mesaId, n_pessoas, data } = req.body;
      
    if (!mesaId || !n_pessoas || !data) {
        return res.status(400).json({ erro: true, mensagem: "Os campos 'mesaId', 'n_pessoas' e 'data' são obrigatórios." });
      }
      const dataReserva = new Date(data);
      const hoje = new Date();
      
    if (dataReserva < hoje) {
        return res.status(400).json({ erro: true, mensagem: "A data da reserva não pode ser anterior à data atual." });
      }
      const mesa = await prisma.mesa.findUnique({ where: { id: mesaId }, include: { reservas: { where: { data: dataReserva, status: true } } } });
      
    if (!mesa) {
        return res.status(404).json({ erro: true, mensagem: "A mesa selecionada não foi encontrada." });
      }
      
    if (n_pessoas > mesa.n_lugares) {
        return res.status(400).json({ erro: true, mensagem: `A mesa selecionada comporta no máximo ${mesa.n_lugares} pessoas.` });
      }
      
    if (mesa.reservas.length > 0) {
        return res.status(400).json({ erro: true, mensagem: "A mesa selecionada já está reservada para esta data." });
      }
      await prisma.reserva.create({ data: { data: dataReserva, n_pessoas, status: true, usuario: { connect: { id: req.usuarioId } }, mesa: { connect: { id: mesaId } } } });
      return res.status(201).json({ erro: false, mensagem: "Reserva realizada com sucesso!" });
    } catch (err) {
 
     console.error("Erro ao registrar reserva:", err);
      return res.status(500).json({ erro: true, mensagem: "Ocorreu um erro ao cadastrar a reserva. Tente novamente mais tarde." });
    }
  }

  static async verMinhasReservas(req, res) {
    try {
      const reservas = await prisma.reserva.findMany({ where: { usuarioId: req.usuarioId }, include: { mesa: true } });
      return res.status(200).json({ erro: false, mensagem: "Reservas carregadas com sucesso!", reservas });
    } catch (err) {
     
 console.error("Erro ao carregar reservas:", err);
      return res.status(500).json({ erro: true, mensagem: "Erro ao carregar reservas. Tente novamente mais tarde." });
    }
  }

  static async cancelarReserva(req, res) {
    try {
      const { reservaId } = req.body;
      
    if (!reservaId) {
        return res.status(400).json({ erro: true, mensagem: "O campo 'reservaId' é obrigatório." });
      }
      const reserva = await prisma.reserva.findUnique({ where: { id: reservaId } });
      
    if (!reserva || reserva.usuarioId !== req.usuarioId) {
        return res.status(403).json({ erro: true, mensagem: "Reserva não encontrada ou não pertence ao usuário." });
      }
      const hoje = new Date();
      
    if (new Date(reserva.data) < hoje) {
        return res.status(400).json({ erro: true, mensagem: "Não é possível cancelar reservas de datas anteriores." });
      }
      await prisma.reserva.update({ where: { id: reservaId }, data: { status: false } });
      return res.status(200).json({ erro: false, mensagem: "Reserva cancelada com sucesso!" });
    } catch (err) {
      
     console.error("Erro ao cancelar reserva:", err);
      return res.status(500).json({ erro: true, mensagem: "Erro ao cancelar a reserva. Tente novamente mais tarde." });
    }
  }

  static async buscarReservasPorData(req, res) {
    try {
      const { data } = req.query;
      
    if (!data) {
        return res.status(400).json({ erro: true, mensagem: "O campo 'data' é obrigatório." });
      }
      const reservas = await prisma.reserva.findMany({ where: { data: new Date(data) }, include: { mesa: true, usuario: true } });
      return res.status(200).json({ erro: false, mensagem: "Reservas carregadas com sucesso!", reservas });
    } catch (err) {
      
     console.error("Erro ao buscar reservas:", err);
      return res.status(500).json({ erro: true, mensagem: "Erro ao buscar reservas. Tente novamente mais tarde." });
    }
  }
}

module.exports = ReservaController;
