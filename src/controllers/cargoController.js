var cargoModel = require("../models/cargoModel");

function criar(req, res) {
    var nomeCargo = req.body.nomeJSON;
    console.log("função criar controller");
    if (nomeCargo == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    cargoModel.criar(nomeCargo).then(function (resposta) {
        res.status(200).send("Cargo criado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function selecionar(req, res){
    var nomeCargo = req.body.nomeJSON;

    if (nomeCargo == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    cargoModel.selecionar(nomeCargo).then(function (resposta) {
        res.status(200).send("Cargo criado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })    
}

module.exports = {
   criar,
   selecionar
}