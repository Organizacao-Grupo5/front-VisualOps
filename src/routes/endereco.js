var express = require("express");
var router = express.Router();

var enderecoController = require("../controllers/enderecoController");

router.post("/cadastrar", function (req, res) {
    enderecoController.cadastrar(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    enderecoController.listarByFkEmpresa(req, res);
});

module.exports = router;