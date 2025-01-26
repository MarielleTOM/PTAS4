const express = require("express")
const router = require("express").Router ();

const ReservaController = require("../controllers/ReservaController");
const AuthController = require("../controllers/AuthController");

router.post(
"/novo", ReservaController.registrarReserva);

// Ver as reservas do usuário
router.get(
"/minhas-reservas", ReservaController.verMinhasReservas);

// Cancelar uma reserva
router.delete(
"/cancelar", ReservaController.cancelarReserva);

// Buscar reservas por data (administrador)
router.get(
"/reservas-por-data", ReservaController.buscarReservasPorData);

module.exports = router;