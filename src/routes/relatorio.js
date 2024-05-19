const express = require("express");
const router = express.Router();

const relatorioController = require('../controllers/relatorioController');

router.post('/:idUsuario', (req, res) => {
    return relatorioController.buscarComponentesElegiveis(req, res)
})

router.post('/:idUsuario/abrirRelatorio', (req, res) => {
    
})

module.exports = router;