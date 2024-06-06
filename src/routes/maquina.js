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

router.post("/salvar", function (req, res) {
    maquinaController.salvarMaquina(req, res);
});

router.get("/listarMaquina/:idEmpresa", (req, res) => {
    return maquinaController.buscarMaquinaPorEmpresa(req, res);
})

router.post("/buscarFuncionarios", (req, res) => {
    return maquinaController.buscarFuncionarios(req, res);
})

router.delete("/deletar/:idMaquina", (req, res) => {
    return maquinaController.deletarMaquina(req, res);
})
router.put("/editar/:idMaquina", (req, res) => {
    return maquinaController.editarMaquina(req, res);
})

module.exports = router;