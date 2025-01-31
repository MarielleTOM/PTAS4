const express = require("express");
const router = express.Router();
const MesaController = require("../controllers/MesaController");
const AuthController = require("../controllers/AuthController");

// Cadastrar Nova Mesa (restrito ao adm)
router.post(
  "/novo",
  AuthController.verificaAutenticacao,
  AuthController.verificaPermissaoAdm,
  MesaController.novaMesa
);

// Buscar Mesas (sem necessidade de autenticação)
router.get("/", MesaController.buscarMesas);

// Consultar Mesas Disponíveis por Data (sem necessidade de autenticação)
router.get("/disponibilidade", MesaController.consultarDisponibilidade);

module.exports = router;
