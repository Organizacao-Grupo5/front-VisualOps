const express = require("express");
const router = express.Router();

const maquinaController = require("../controllers/maquinaController");

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
});

router.get("/contar/:fkUsuario", function (req, res) {
    maquinaController.contar(req, res);
});

module.exports = router;