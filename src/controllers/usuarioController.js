const usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const cargo = req.body.cargo;
    

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("fkCargos está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, cargo)
        .then(resposta => {

            res.status(200).json(resposta);
        
        })
        .catch(erro => {

            res.status(500).json(erro.sqlMessage);
        
        });
    }
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
            .then(resultadoAutenticar => {

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