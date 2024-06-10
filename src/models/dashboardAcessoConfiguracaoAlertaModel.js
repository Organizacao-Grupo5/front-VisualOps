var database = require("../database/config");

function carregarInfosMaquina(id) {
    var instrucao = `SELECT 
	(SELECT idMaquina FROM maquina JOIN usuario ON idUsuario = fkUsuario JOIN ipv4 ON idMaquina WHERE idUsuario = ${id} LIMIT 1) AS id_maquina,
    (SELECT nome FROM maquina JOIN usuario ON idUsuario = fkUsuario JOIN ipv4 ON idMaquina WHERE idUsuario = ${id} LIMIT 1) AS nome_maquina,
    (SELECT numeroIP FROM maquina JOIN usuario ON idUsuario = fkUsuario JOIN ipv4 ON idMaquina WHERE idUsuario = ${id} LIMIT 1) AS ip_maquina,
    (SELECT modelo FROM componente JOIN captura ON idComponente WHERE componente = "Volume" ORDER BY dadoCaptura DESC LIMIT 1) AS modelo_volume,
    (SELECT dadoCaptura FROM componente JOIN captura ON idComponente WHERE componente = "Volume" ORDER BY dadoCaptura DESC LIMIT 1) AS dado_volume,
    (SELECT unidadeMedida FROM componente JOIN captura ON idComponente WHERE componente = "Volume" ORDER BY dadoCaptura DESC LIMIT 1) AS unidade_volume,
    (SELECT modelo FROM componente JOIN captura ON idComponente WHERE componente = "CPU" LIMIT 1) AS modelo_cpu,
    (SELECT modelo FROM componente JOIN captura ON idComponente WHERE componente = "GPU" LIMIT 1) AS modelo_gpu1,
    (SELECT modelo FROM componente JOIN captura ON idComponente WHERE componente = "GPU" LIMIT 1,1) AS modelo_gpu2;`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    carregarInfosMaquina
};