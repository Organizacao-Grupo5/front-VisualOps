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



function cifraDeCesar(mensagem, deslocamento) {
    return mensagem.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt();
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + deslocamento) % 26) + base);
        }
        return char;
    }).join('');
}





function validarLogin(resposta,res){
    
    res.json({
        id: resposta[0].id,
        email: resposta[0].email,
        nome: resposta[0].nome,
        senha: resposta[0].senha,
        nomeEmpresa: resposta[0].nomeEmpresa,
        fkEmpresa: resposta[0].fkEmpresa,
        imagemPerfil: resposta[0].imagemPerfil,
    });
}



function autenticar(req, res) {
    var email = req.body.emailJSON;
    var senha = req.body.senhaJSON;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, cifraDeCesar(senha,3))
        .then(resposta => {
            if (resposta.length == 1) {
                validarLogin(resposta,res)
            } else {
                usuarioModel.autenticar(email,senha)
                .then(resposta=>{
                    if (resposta.length == 1) {
                        validarLogin(resposta,res)
                    }
                    else{
                        res.status(400).send("Não foi possivel autenticar o usuário")
                    }
                })
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

    if (idUsuario != undefined && idUsuario != '') {
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