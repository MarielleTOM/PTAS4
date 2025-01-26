const express = require("express")
const router = require("express").Router ();

const ReservaController = require("../controllers/ReservaController");
const AuthController = require("../controllers/AuthController");

router.post(
"/novo", ReservaController.registrarReserva);


module.exports = router;