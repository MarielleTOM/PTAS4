const prisma = require("../prisma/prismaClient");
const express = require("express");
const router = express.Router();

class PerfilController {
  static async getPerfil(req, res) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: req.usuarioId },
        select: { id: true, nome: true, email: true, tipo: true }, // Omitindo a senha
      });
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado", erro: true });
      }
      res.status(200).json({ mensagem: "Perfil carregado com sucesso", erro: false, usuario });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao carregar perfil", erro: true });
    }
  }
  // Atualizar Meu Perfil
  static async atualizaPerfil(req, res) {
    const { nome, email } = req.body.usuario;
    try {
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: req.usuarioId },
        data: { nome, email },
        select: { id: true, nome: true, email: true, tipo: true }, // Retorna os dados atualizados sem senha
      });
      res.status(200).json({ mensagem: "Perfil atualizado com sucesso", erro: false, usuario: usuarioAtualizado });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar perfil", erro: true });
    }
  }
}
module.exports = PerfilController;
