const express = require("express");
const router = express.Router();

const maquinaController = require("../controllers/maquinaController");

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
});

router.get("/selecionar/qualidade/:fkEmpresa", function (req, res) {
    maquinaController.selecionarQualidade(req, res);
});

router.get("/selecionar/prejudicado/:fkEmpresa", function (req, res) {
    maquinaController.selecionarPrejudicados(req, res);
});

router.get("/selecionar/quantidade/:fkEmpresa", function (req, res) {
    maquinaController.selecionarQuantidade(req, res);
});

router.get("/selecionar/componentes/:fkEmpresa", function (req, res) {
    maquinaController.listarComponentes(req, res);
});

router.get("/selecionar/:componente/:fkEmpresa", function (req, res) {
    maquinaController.selecionarComponente(req, res);
});

router.get("/selecionar/:fkEmpresa", function (req, res) {
maquinaController.selecionarMaquinas(req, res);
});

module.exports = router;