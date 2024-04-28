var database = require("../database/config");

function cadastrar(nome, cnpj, fkPlano) {
    var instrucao = `INSERT INTO empresa (nome, cnpj, fkPlano) VALUES ('${nome}', '${cnpj}', ${fkPlano})`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};