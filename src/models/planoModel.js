const database = require("../database/config");

function selecionarPlano() {
    const instrucao = `SELECT idPlano, nome FROM plano`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarPlano(idUsuario) {
    var instrucao = `   
   select plano.nome from plano join empresa on plano.idPlano = empresa.fkPlano join usuario on empresa.idEmpresa = usuario.fkEmpresa where idUsuario = ${idUsuario};		
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    selecionarPlano,
    mostrarPlano
};