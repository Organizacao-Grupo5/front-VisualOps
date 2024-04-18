var database = require("../database/config");

function cadastrar(nome, sobrenome, email, senha) {
    var instrucao = `
        INSERT INTO Usuário (Nome, Status, Email, Senha) VALUES ('${nome}', '${Status}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};