const database = require("../database/config");

function selecionarPlano() {
    const instrucao = `SELECT idPlano, nome FROM plano`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    selecionarPlano
};