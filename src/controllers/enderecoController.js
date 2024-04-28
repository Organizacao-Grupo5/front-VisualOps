const enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {
    const cnpj = req.body.cnpj;
    const logradouro = req.body.logradouro;
    const cep = req.body.cep;
    const numero = req.body.numero;
    const complemento = req.body.complemento;

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!")
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!")
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!")
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!")
    } else {
        empresaModel.cadastrar(cnpj, logradouro, cep, numero, complemento)
            .then(function (resposta) {
                res.status(200).send("Cadastro endereço criado com sucesso");
            }).catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            })
    }
}

module.exports = {
    cadastrar
}