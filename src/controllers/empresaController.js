const empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    const nome = req.body.nome;
    const cnpj = req.body.cnpj;
    const fkPlano = req.body.fkPlano

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!")
    } else if (fkPlano == undefined) {
        res.status(400).send("Seu plano está undefined!")
    } else {
        empresaModel.cadastrar(nome, cnpj, fkPlano)
        .then(function (resposta) {
            res.status(200).send("Cadastro criado com sucesso");
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    cadastrar
}