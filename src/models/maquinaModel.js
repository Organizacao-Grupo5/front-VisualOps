var database = require("../database/config");

function cadastrar(numeroIdentificacao, marca, modelo, fkUsuario) {
    var instrucao = `
        INSERT INTO maquina (numeroIdentificacao, marca, modelo, fkUsuario) VALUES ('${numeroIdentificacao}', '${marca}', ${modelo}, '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selecionarQualidade(fkEmpresa) {
    const query = `SELECT idMaquina, fkAlerta, MONTH(dataCaptura) as mes, COUNT(fkAlerta) AS qtdAlerta FROM maquina AS mac 
    JOIN componente ON idMaquina = fkMaquina 
        JOIN captura ON idComponente = fkComponente 
            JOIN registroalerta ON idCaptura = fkCaptura 
                WHERE fkEmpresa = ${fkEmpresa} 
                    GROUP BY idMaquina, fkAlerta, mes;`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

function selecionarPrejudicados(fkEmpresa) {
    const query = `SELECT idMaquina, componente, fkAlerta, MAX(DAY(dataCaptura)) dia FROM maquina AS mac 
	JOIN componente AS comp ON idMaquina = fkMaquina 
		JOIN captura ON idComponente = fkComponente 
			JOIN registroalerta ON idCaptura = fkCaptura 
				WHERE componente IN ('MemoriaRam', 'CPU', 'GPU', 'HDD') 
					AND fkAlerta > 1 AND fkEmpresa = ${fkEmpresa}
						GROUP BY idMaquina, componente, fkAlerta;`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

function selecionarQuantidade(fkEmpresa) {
    const query = `SELECT idMaquina, componente, fkAlerta, MAX(dataCaptura) maxCap FROM maquina AS mac
	JOIN componente AS comp ON idMaquina = fkMaquina
		JOIN captura ON idComponente = fkComponente
			JOIN registroalerta ON idCaptura = fkCaptura
				WHERE fkEmpresa = ${fkEmpresa}
                    AND componente IN ('MemoriaRam', 'CPU', 'GPU', 'HDD') 
						GROUP BY idMaquina, idComponente, fkAlerta
							ORDER BY idMaquina DESC`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

function listarComponentes(fkEmpresa) {
    const query = `SELECT componente, cap.unidadeMedida uni, COUNT(DAY(cap.dataCaptura)) dia FROM maquina mac
	RIGHT JOIN componente comp ON idMaquina = fkMaquina
		LEFT JOIN captura cap ON idComponente = fkComponente
            WHERE fkEmpresa = ${fkEmpresa}
		    	GROUP BY componente, uni;`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

function selecionarComponente(componente, fkEmpresa) {
    const query = `SELECT cap.dadoCaptura, cap.unidadeMedida, componente, MINUTE(dataCaptura) minuto FROM maquina mac
	JOIN componente comp ON idMaquina = fkMaquina
		JOIN captura cap ON idComponente = fkComponente
			WHERE fkEmpresa = ${fkEmpresa} AND componente = '${componente}'
				GROUP BY idMaquina, cap.dadoCaptura, cap.unidadeMedida, minuto
                    ORDER BY minuto;`;

    console.log(`Executando a instrução SQL: \n${query}`);
    return database.executar(query);
}

module.exports = {
    cadastrar,
    selecionarQualidade,
    selecionarPrejudicados,
    selecionarQuantidade,
    listarComponentes,
    selecionarComponente
};