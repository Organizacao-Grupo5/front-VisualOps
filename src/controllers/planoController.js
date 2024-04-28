const planoModel = require("../models/planoModel");

function selecionarPlano(req, res) {

    planoModel.selecionarPlano()
    .then(resposta => {
        res.status(200).json(resposta);
             
    })
    .catch(erro => {

        res.status(500).json(erro.sqlMessage);
        
    });
}

module.exports = {
    selecionarPlano
};