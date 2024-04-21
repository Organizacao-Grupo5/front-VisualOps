const { resolve } = require("path");
var cargoModel = require("../models/cargoModel");

function criar(req, res) {
    var nomeCargo = req.body.nomeJSON;
    console.log("função criar controller");
    if (nomeCargo == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    cargoModel.criar(nomeCargo)
    .then(resposta => {
        res.status(200).json(resposta);
    
    }).catch(erro => {
        if (erro.code == 'ER_DUP_ENTRY') {
            res.status(409).json({ mensagem: 'Já existe um cargo com esse nome.' });
        } else {
            res.status(500).json(erro.sqlMessage);
        }

    })
}

function selecionar(req, res){
    const nomeCargo = req.params.nomeCargo;

    if (nomeCargo == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } 

    cargoModel.selecionar(nomeCargo)
    .then(resposta => {
        res.status(200).json(resposta[0]);
    
    }).catch(erro => {

        res.status(500).json(erro.sqlMessage);
    
    })    
};

module.exports = {
   criar,
   selecionar
}