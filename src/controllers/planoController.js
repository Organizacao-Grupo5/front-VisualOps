var planoModel = require("../models/planoModel");

function selecionarPlano(req, res) {

    planoModel.selecionarPlano().then((resposta) => {
        res.status(200).json(resposta);
    });
}

module.exports = {
    selecionarPlano
};