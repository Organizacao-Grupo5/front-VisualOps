var database = require("../database/config");

function cadastrar(numeroIdentificacao, marca, modelo, fkUsuario) {
    var instrucao = `
        INSERT INTO maquina (numeroIdentificacao, marca, modelo, fkUsuario) VALUES ('${numeroIdentificacao}', '${marca}', ${modelo}, '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contar (fkUsuario) {
    const query = `SELECT COUNT(*) FROM maquina WHERE fkUsuario = ${fk}`;
    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

module.exports = {
    cadastrar,
    contar
};