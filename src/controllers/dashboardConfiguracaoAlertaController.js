const dashboardConfiguracaoAlertaController = require("../models/dashboardConfiguracaoAlertaModel");


function carregarInfosMaquina(req, res) {

    var id = req.body.idServer;
    var maquina = req.body.idMaqui;

    dashboardConfiguracaoAlertaController.carregarInfosMaquina(id, maquina)
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


function carregarInfosComponente(req, res) {

    var id = req.body.idServer;
    var maquina = req.body.idMaqui;

    dashboardConfiguracaoAlertaController.carregarInfosComponente(id, maquina)
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



function salvarAlertaCritico(req, res) {

    var maquina = req.body.idMaqui;
    var idComponente = req.body.idDoComponente;
    var fkComponente = req.body.fkDoComponente;
    var fkMaquina = req.body.fkDaMaquina;
    var valor = req.body.idValor;

    dashboardConfiguracaoAlertaController.salvarAlertaCritico(maquina, idComponente, fkComponente, fkMaquina, valor)
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

function carregaridComponente(req, res) {

    var componente = req.body.idComponente;
    var maquina = req.body.idMaqui;

    dashboardConfiguracaoAlertaController.carregaridComponente(componente, maquina)
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
    carregarInfosMaquina,
    carregarInfosComponente,
    salvarAlertaCritico,
    carregaridComponente
}