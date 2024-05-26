const usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const cargo = req.body.cargo;
    const fkEmpresa = req.body.fkEmpresa;
    

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("fkCargos está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, cargo, fkEmpresa)
        .then(resposta => {

            res.status(200).json(resposta);
        
        })
        .catch(erro => {

            console.log("Houve um erro ao criar o usuário! Erro: ", erro);
                    
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

            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);
        
            if (resultadoAutenticar.length == 1) {

                res.json({
                    id: resultadoAutenticar[0].id,
                    email: resultadoAutenticar[0].email,
                    nome: resultadoAutenticar[0].nome,
                    senha: resultadoAutenticar[0].senha,
                    nomeEmpresa: resultadoAutenticar[0].nomeEmpresa,
                    idEmpresa: resultadoAutenticar[0].idEmpresa,
                });
                
            } else {
                console.log("Erro nenhum usuário encontrado com essas informações!");

                res.status(400).send("Erro não foi possível encontrar usuário com esse email e senha!");
            }
        })
        .catch (erro =>  {
            console.log(erro);

            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function listar (req, res) {
    const idUsuario = req.params.id;

    if (idUsuario != null || idUsuario != '') {
        usuarioModel.listar(idUsuario)
        .then(resultado => {

            if (resultado.length > 0) {
                res.json({
                    id: resultado[0].id,
                    nome: resultado[0].nome,
                    email: resultado[0].email,
                    senha: resultado[0].senha,
                    cargo: resultado[0].cargo,
                    fkEmpresa: resultado[0].fkEmpresa
                });
            
            } else {
                console.log("Erro! nenhum usuário encontrado com essas informações!");

                res.status(400).send("Erro não foi possível encontrar usuário com esse id!")
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
    autenticar,
    listar
}