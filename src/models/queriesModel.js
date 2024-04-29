const database = require("../database/config");

function listar (tabela) {
    const query = `SELECT * FROM ${tabela};`;

    console.log("Executar a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = { listar };
