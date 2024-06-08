var database = require("../database/config");

function cadastrar(nome, email, senha, cargo, fkEmpresa) {
    var instrucao = `INSERT INTO usuario (nome, email, senha, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cargo}', ${fkEmpresa})`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(email, senha) {
    var instrucao = `SELECT idUsuario as id, usuario.nome, usuario.email, empresa.nome as nomeEmpresa, usuario.fkEmpresa, usuario.imagemPerfil FROM usuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa WHERE email = '${email}' AND senha = '${senha}'`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar (idUsuario) {
    const query = `SELECT * FROM usuario WHERE idUsuario = ${idUsuario}`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrar,
    autenticar,
    listar
};