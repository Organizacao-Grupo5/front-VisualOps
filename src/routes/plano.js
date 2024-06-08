var express = require("express");
var router = express.Router();

var planoController = require("../controllers/planoController");

router.get("/selecionar", function (req, res) {
    planoController.selecionarPlano(req, res);
});

router.get("/mostrarPlano/:idUsuario", function (req, res) {
    planoController.mostrarPlano(req, res);
});

module.exports = router;