var database = require("../database/config");

function selecionarPlano() {
    console.log("Selecionar plano acessado!");
    var instrucao = `
    select nome, descricao from plano; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    selecionarPlano
};