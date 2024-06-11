var database = require("../database/config");

function carregarInfosFuncionario(id) {
    var instrucao = `SELECT * FROM usuario join maquina on idUsuario = fkUsuario where idUsuario = ${id};`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function carregarTodosFuncionarios(id) {
    var instrucao = `SELECT * FROM usuario left join maquina on idUsuario = fkUsuario;`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function salvarInfosFuncionario(id, gestor, maquina, cargo, senha, email, nome) {
    var instrucao = `UPDATE usuario 
    JOIN maquina ON idUsuario = fkUsuario 
    SET usuario.nome = '${nome}', 
    senha = '${senha}', 
    email = '${email}', 
    numeroIdentificacao = '${maquina}', 
    cargo = '${cargo}' 
    WHERE idUsuario = ${id};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function criarFuncionario(gestor, maquina, cargo, senha, email, nome, empresa) {
    var instrucao = `INSERT INTO usuario (nome, email, senha, cargo, fkEmpresa) VALUES
                    ('${nome}', '${email}', '${senha}', '${cargo}', ${empresa});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function excluirFuncionario(userDelete) {
    var instrucao = `DELETE FROM usuario where idUsuario = ${userDelete};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    carregarInfosFuncionario,
    salvarInfosFuncionario,
    carregarTodosFuncionarios,
    criarFuncionario,
    excluirFuncionario
};