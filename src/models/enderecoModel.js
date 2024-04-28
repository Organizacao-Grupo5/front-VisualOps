const database = require("../database/config");

function cadastrar(cnpj, logradouro, cep, numero, complemento) {
    const instrucao = `INSERT INTO endereco (cnpj, logradouro, cep, numero, complemento) VALUES ('${cnpj}', '${logradouro}', ${cep}, '${numero}', '${complemento}')`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};