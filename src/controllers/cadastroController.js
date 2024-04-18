var cadastroModel = require("../models/cadastroModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var Status = req.body.StatusServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    if (Status == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    }

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }

    if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }

    cadastroModel.cadastrar(nome, Status, email, senha).then(function (resposta) {
        res.status(200).send("Cadastro criado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrar
}