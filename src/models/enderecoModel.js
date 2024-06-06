const database = require("../database/config");

function cadastrar(cep, logradouro, numero, bairro, estado, complemento, fkEmpresa) {
    const instrucao = `INSERT INTO endereco (cep, logradouro, numero, bairro, estado, complemento, fkEmpresa) VALUES ('${cep}', '${logradouro}', '${numero}', '${bairro}', '${estado}', '${complemento}', ${fkEmpresa})`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarByFkEmpresa(fkEmpresa) {
    const query = `SELECT * FROM endereco WHERE fkEmpresa = ${fkEmpresa} LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrar,
    listarByFkEmpresa
};