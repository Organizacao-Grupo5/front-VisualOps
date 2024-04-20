var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    var nome = req.body.nomeJSON;
    var email = req.body.emailJSON;
    var senha = req.body.senhaJSON;
    var fkPlano = req.body.fkPlanoJSON;
    var fkCargos = req.body.fkCargosJSON;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }

    if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }

    if (fkPlano == undefined) {
        res.status(400).send("fkPlano está undefined!");
    }

    if (fkCargos == undefined) {
        res.status(400).send("fkCargos está undefined!");
    }

    usuarioModel.cadastrar(nome, email, senha, fkPlano, fkCargos).then(function (resposta) {
        res.status(200).send("Cadastro criado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function autenticar(req, res) {
    var email = req.body.emailJSON;
    var senha = req.body.senhaJSON;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);
                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        if (resultadoAutenticar.length == 1) {

                            console.log(resultadoAutenticar);

                            res.json({
                                id: resultadoAutenticar[0].id,
                                email: resultadoAutenticar[0].email,
                                nome: resultadoAutenticar[0].nome,
                                senha: resultadoAutenticar[0].senha

                            });

                        } else if (resultadoAutenticar.length == 0) {
                            res.status(403).send("Email e/ou senha inválido(s)");
                        } else {
                            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                        }
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar,
    autenticar
}