const maquinaModel = require("../models/maquinaModel");

function cadastrar(req, res) {
    const numeroIdentificacao = req.body.numeroIdentificacao;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const fkUsuario = req.body.fkUsuario;

    if (numeroIdentificacao == undefined) {
        res.status(400).send("O número de identificação está undefined!");
    } else if (marca == undefined) {
        res.status(400).send("Seu marca está undefined!")
    } else if (modelo == undefined) {
        res.status(400).send("Seu modelo está undefined!")
    } else if (fkUsuario == undefined){
        res.status(400).send("A fkUsuario está undefined!")
    } else {
        maquinaModel.cadastrar(numeroIdentificacao, marca, modelo, fkUsuario)
        .then(function (resposta) {
            res.status(200).send("Cadastro criado com sucesso");
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}


function selecionarQualidade(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else {
        maquinaModel.selecionarQualidade(fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function selecionarPrejudicados(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else {
        maquinaModel.selecionarPrejudicados(fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function selecionarQuantidade(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else {
        maquinaModel.selecionarQuantidade(fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    cadastrar,
    selecionarQualidade,
    selecionarPrejudicados,
    selecionarQuantidade
}