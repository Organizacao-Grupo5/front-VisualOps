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

router.post("/upload-excell", async(req, res) => {
    return excelController.gerarRelatorioExcell(req, res);
})

module.exports = router;