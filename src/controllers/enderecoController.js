const enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const estado = req.body.estado;
    const complemento = req.body.complemento;

    console.log('BAIRRO ==> ',bairro)
    console.log('ESTADO ==> ', estado)

    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!")
    } else if (logradouro == undefined) {
        res.status(400).send("Seu lougradouro está undefined!")
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!")
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!")
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!")
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