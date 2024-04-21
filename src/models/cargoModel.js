var database = require("../database/config");

function criar(nomeCargo) {
    var instrucao = `INSERT INTO cargos (nome) VALUES ('${nomeCargo}')`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selecionar(nomeCargo){
    var instrucao = `SELECT idCargos FROM cargos WHERE nome = '${nomeCargo}' LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    criar,
    selecionar
};