var database = require("../database/config");

function cadastrar(nome, email, senha, cargo, fkEmpresa) {
    var instrucao = `INSERT INTO usuario (nome, email, senha, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cargo}', ${fkEmpresa})`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(email, senha) {
    var instrucao = `SELECT idUsuario as id, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}'`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    autenticar
};