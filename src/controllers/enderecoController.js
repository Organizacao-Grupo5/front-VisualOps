const enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const estado = req.body.estado;
    const complemento = req.body.complemento;
    const fkEmpresa = req.body.fkEmpresa;

    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu lougradouro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else if (bairro == undefined) {

        console.log("\nERRO NA BAIRRO ==>\n")

        res.status(400).send("Seu bairro está undefined!");
    } else if (estado == undefined) {

        console.log("\nERRO NA ESTADO ==>\n")

        res.status(400).send("Seu estado está undefined!");
    } else if (complemento == undefined) {

        console.log("\nERRO NA COMPLEMENTO ==>\n")

        res.status(400).send("Seu complemento está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {

        console.log("\nENTROU AQUI\n")


        enderecoModel.cadastrar(cep, logradouro, numero, bairro, estado, complemento, fkEmpresa)
        .then(function (resposta) {

            res.status(200).json(resposta);

        }).catch(function (erro) {

            console.log("Houve um erro ao criar o endereço! Erro: ", erro);

            res.status(500).json(erro.sqlMessage);
            
        });
    }
}

function listarByFkEmpresa (req, res) {
    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa != undefined && fkEmpresa != '') {
        enderecoModel.listarByFkEmpresa(fkEmpresa)
        .then(resultado => {

            if (resultado.length > 0) {
                res.json({
                    id: resultado[0].id,
                    cep: resultado[0].cep,
                    logradouro: resultado[0].logradouro,
                    numero: resultado[0].numero,
                    bairro: resultado[0].bairro,
                    estado: resultado[0].estado,
                    complemento: resultado[0].complemento
                });
            
            } else {
                console.log("Erro! nenhum endereço encontrado com essas informações!");

                res.status(400).send("Erro não foi possível encontrar o endereço!")
            }
        })
        .catch (erro =>  {
            console.log(erro);

            console.log("\nHouve um erro ao realizar o select! Erro: ", erro);
            
            res.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    cadastrar,
    listarByFkEmpresa
}