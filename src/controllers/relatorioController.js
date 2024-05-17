const relatorioModel = require('../models/relatorioModel')

function buscarComponentesElegiveis(req, res){
    const idUsuario = req.params
    const preferencias = req.body.dados

    relatorioModel.buscarQtdRelatorios(idUsuario, preferencias)
    .then(resposta => {
            res.json(resposta);
        }
    ).catch(erro => {
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    buscarComponentesElegiveis
}