var database = require("../database/config");

function cadastrar(numeroIdentificacao, marca, modelo, fkUsuario) {
    var instrucao = `
        INSERT INTO maquina (numeroIdentificacao, marca, modelo, fkUsuario) VALUES ('${numeroIdentificacao}', '${marca}', ${modelo}, '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selecionarQualidade(fkEmpresa) {
    const query = `SELECT mac.*, fkAlerta, MONTH(dataCaptura) as semana, COUNT(fkAlerta) AS qtdAlerta FROM maquina AS mac JOIN componente ON idMaquina = fkMaquina JOIN captura ON idComponente = fkComponente JOIN registroalerta ON idCaptura = fkCaptura WHERE fkEmpresa = ${fkEmpresa} GROUP BY idMaquina, fkAlerta, mes;`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

module.exports = {
    cadastrar,
    selecionarQualidade
};