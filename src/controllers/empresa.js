var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    var nome = req.body.nomeJSON;
    var cnpj = req.body.cnpjJSON;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!")
    } else {
        usuarioModel.cadastrar(nome, cnpj).then(function (resposta) {
            res.status(200).send("Cadastro criado com sucesso");
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }

    module.exports = {
        cadastrar
    }
}