const express = require("express");
const router = express.Router();

const ReservaController = require("../controllers/ReservaController");
const AuthController = require("../controllers/AuthController");

router.post("/novo", AuthController.verificaAutenticacao, ReservaController.registrarReserva);
router.get("/", AuthController.verificaAutenticacao, ReservaController.verMinhasReservas);  
router.delete("/", AuthController.verificaAutenticacao, ReservaController.cancelarReserva);
router.get("/list", 
    AuthController.verificaAutenticacao, 
    AuthController.verificaPermissaoAdm, 
    ReservaController.buscarReservasPorData
);

module.exports = router;
