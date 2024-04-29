const database = require("../database/config");

function listar (tabela, valor, alvo, join) {
    const query = `SELECT ${alvo} FROM ${tabela} ${join} ${valor};`;

    console.log("Executar a instrução SQL: \n" + query);
    return database.executar(query);
}

function deletar (tabela, campo, valor) {
    const query = `DELETE FROM ${tabela} WHERE ${campo} = ${valor};`;

    console.log("Executar a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = { listar, deletar };
