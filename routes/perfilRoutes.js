const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/PerfilController");
const AuthController = require("../controllers/AuthController")
router.get("/", ProfileController.getPerfil);
router.patch("/", ProfileController.atualizaPerfil);
router.get("/todos", 
    AuthController.verificaAutenticacao, 
    AuthController.verificaPermissaoAdm, 
    ProfileController.buscarUsuarios
);
module.exports = router;