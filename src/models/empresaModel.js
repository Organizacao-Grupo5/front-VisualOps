var database = require("../database/config");

function cadastrar(nome, cnpj) {
    var instrucao = `
        INSERT INTO empresa (nome, cnpj) VALUES ('${nome}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};