const express = require("express");
const router = express.Router();

const relatorioController = require('../controllers/relatorioController');
const excelController = require('../controllers/excellController')

router.post('/:idUsuario', (req, res) => {
    return relatorioController.buscarComponentesElegiveis(req, res)
})

router.post('/:idUsuario/abrirRelatorio', (req, res) => {
    relatorioController.abrirRelatorio(req, res)
})

router.post("/upload-excel/:idMaquina", async(req, res) => {
    excelController.gerarRelatorioExcell(req, res);
})

router.get("/usuarioMaquina/:idMaquina", async (req, res) => {
    relatorioController.buscaUsuarioMaquina(req, res)
})

module.exports = router;