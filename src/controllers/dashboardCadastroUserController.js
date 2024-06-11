const dashboardCadastroUserModel = require("../models/dashboardCadatroUserModel");


function carregarInfosFuncionario(req, res) {

    var id = req.body.idServer;

    dashboardCadastroUserModel.carregarInfosFuncionario(id)
        .then(resultadoRequerirDados => {

            console.log(`Resultados: ${JSON.stringify(resultadoRequerirDados)}`);

            if (resultadoRequerirDados.length > 0) {

                res.json({resultadoRequerirDados});
                console.log(resultadoRequerirDados);

            } else {
                console.log("Erro nenhum usuário encontrado com essas informações!");

                res.status(400).send("Erro nenhum usuário encontrado com essas informações!");
            }
        })
        .catch(erro => {
            console.log(erro);

            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);
        });
}



function carregarTodosFuncionarios(req, res) {

    var id = req.body.idServer;

    dashboardCadastroUserModel.carregarTodosFuncionarios(id)
        .then(resultadoRequerirDados => {

            console.log(`Resultados: ${JSON.stringify(resultadoRequerirDados)}`);

            if (resultadoRequerirDados.length > 0) {

                res.json({resultadoRequerirDados});
                console.log(resultadoRequerirDados);

            } else {
                console.log("Erro nenhum usuário encontrado com essas informações!");

                res.status(400).send("Erro nenhum usuário encontrado com essas informações!");
            }
        })
        .catch(erro => {
            console.log(erro);

            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);
        });
}



function salvarInfosFuncionario(req, res) {

    var id = req.body.idServer;
    var gestor = req.body.gestorFuncionarioServer;
    var maquina = req.body.maquinaFuncionarioServer;
    var cargo = req.body.cargoFuncionarioServer;
    var senha = req.body.senhaFuncionarioServer;
    var email = req.body.emailFuncionarioServer;
    var nome = req.body.nomeFuncionarioServer;

    dashboardCadastroUserModel.salvarInfosFuncionario(id, gestor, maquina, cargo, senha, email, nome)
        .then(resultadoRequerirDados => {

            console.log(`Resultados: ${JSON.stringify(resultadoRequerirDados)}`);

            if (resultadoRequerirDados.length > 0) {

                res.json({resultadoRequerirDados});
                console.log(resultadoRequerirDados);

            } else {
                console.log("Erro nenhum usuário encontrado com essas informações!");

                res.status(400).send("Erro nenhum usuário encontrado com essas informações!");
            }
        })
        .catch(erro => {
            console.log(erro);

            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);
        });
}





function criarFuncionario(req, res) {

    var gestor = req.body.gestorFuncionarioServer;
    var maquina = req.body.maquinaFuncionarioServer;
    var cargo = req.body.cargoFuncionarioServer;
    var senha = req.body.senhaFuncionarioServer;
    var email = req.body.emailFuncionarioServer;
    var nome = req.body.nomeFuncionarioServer;
    var empresa = req.body.empresaServer;

    dashboardCadastroUserModel.criarFuncionario(gestor, maquina, cargo, senha, email, nome, empresa)
        .then(resultadoRequerirDados => {

            console.log(`Resultados: ${JSON.stringify(resultadoRequerirDados)}`);

            if (resultadoRequerirDados.length > 0) {

                res.json({resultadoRequerirDados});
                console.log(resultadoRequerirDados);

            } else {
                console.log("Erro nenhum usuário encontrado com essas informações!");

                res.status(400).send("Erro nenhum usuário encontrado com essas informações!");
            }
        })
        .catch(erro => {
            console.log(erro);

            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);
        });
}



function excluirFuncionario(req, res) {

    var userDelete = req.body.userDeleteServer;

    dashboardCadastroUserModel.excluirFuncionario(userDelete)
        .then(resultadoRequerirDados => {

            console.log(`Resultados: ${JSON.stringify(resultadoRequerirDados)}`);

            if (resultadoRequerirDados.length > 0) {

                res.json({resultadoRequerirDados});
                console.log(resultadoRequerirDados);

            } else {
                console.log("Erro nenhum usuário encontrado com essas informações!");

                res.status(400).send("Erro nenhum usuário encontrado com essas informações!");
            }
        })
        .catch(erro => {
            console.log(erro);

            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    carregarInfosFuncionario,
    salvarInfosFuncionario,
    carregarTodosFuncionarios,
    criarFuncionario,
    excluirFuncionario
}