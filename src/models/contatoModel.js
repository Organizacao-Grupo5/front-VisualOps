var database = require("../database/config");

function cadastrar(telefone, fkUsuario) {
    var instrucao = `
        INSERT INTO empresa (telefone, fkUsuario) VALUES ('${telefone}', '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};