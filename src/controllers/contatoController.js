const contatoModel = require("../models/contatoModel");

function cadastrar(req, res) {
    const telefone = req.body.telefone;
    const fkUsuario = req.body.fkUsuario;

    if (telefone == undefined) {
        res.status(400).send("O número de identificação está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Seu marca está undefined!")
    } else {
        contatoModel.cadastrar(telefone, fkUsuario)
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