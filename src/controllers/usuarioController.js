var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    var nome = req.body.nomeJSON;
    var email = req.body.emailJSON;
    var senha = req.body.senhaJSON;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }

    if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }

    usuarioModel.cadastrar(nome, email, senha).then(function (resposta) {
        res.status(200).send("Cadastro criado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrar
}