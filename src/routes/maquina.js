const express = require("express");
const router = express.Router();

const maquinaController = require("../controllers/maquinaController");

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
});

router.get("/selecionar/qualidade/:fkEmpresa", function (req, res) {
    maquinaController.selecionarQualidade(req, res);
});

module.exports = router;