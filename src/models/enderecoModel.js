const database = require("../database/config");

function cadastrar(cep, logradouro, numero, bairro, estado, complemento, fkEmpresa) {
    const instrucao = `INSERT INTO endereco (cep, logradouro, numero, bairro, estado, complemento, fkEmpresa) VALUES ('${cep}', '${logradouro}', '${numero}', '${bairro}', '${estado}', '${complemento}', ${fkEmpresa})`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};