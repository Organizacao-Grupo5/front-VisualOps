const dashboardUserController = require("../models/dashboardUserModel");


function porcentagemUso(req, res) {

    var id = req.body.idServer;

    dashboardUserController.porcentagemUso(id)
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


function desempenho(req, res) {

    var id = req.body.idServer;

    dashboardUserController.desempenho(id)
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

function historicoDesempenho(req, res) {

    var id = req.body.idServer;

    dashboardUserController.historicoDesempenho(id)
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
    porcentagemUso,
    desempenho,
    historicoDesempenho
}