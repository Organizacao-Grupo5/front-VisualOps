var database = require("../database/config");

function carregarInfosMaquina(id, maquina) {
    var instrucao = `SELECT 
    (SELECT idMaquina FROM maquina JOIN usuario ON idUsuario = fkUsuario JOIN ipv4 ON idMaquina WHERE idUsuario = ${id} AND idMaquina = ${maquina} LIMIT 1) AS id_maquina,
    (SELECT nome FROM maquina JOIN usuario ON idUsuario = fkUsuario JOIN ipv4 ON idMaquina WHERE idUsuario = ${id} AND idMaquina = ${maquina} LIMIT 1) AS nome_maquina,
    (SELECT numeroIP FROM maquina JOIN usuario ON idUsuario = fkUsuario JOIN ipv4 ON idMaquina WHERE idUsuario = ${id} AND idMaquina = ${maquina} LIMIT 1) AS ip_maquina,
    (SELECT modelo FROM componente JOIN captura ON idComponente WHERE componente = "Volume" ORDER BY dadoCaptura DESC LIMIT 1) AS modelo_volume,
    (SELECT dadoCaptura FROM componente JOIN captura ON idComponente WHERE componente = "Volume" ORDER BY dadoCaptura DESC LIMIT 1) AS dado_volume,
    (SELECT unidadeMedida FROM componente JOIN captura ON idComponente WHERE componente = "Volume" ORDER BY dadoCaptura DESC LIMIT 1) AS unidade_volume,
    (SELECT modelo FROM componente JOIN captura ON idComponente WHERE componente = "CPU" LIMIT 1) AS modelo_cpu,
    (SELECT modelo FROM componente JOIN captura ON idComponente WHERE componente = "GPU" LIMIT 1) AS modelo_gpu1,
    (SELECT modelo FROM componente JOIN captura ON idComponente WHERE componente = "GPU" LIMIT 1,1) AS modelo_gpu2;
`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




function carregarInfosComponente(id, maquina) {
    var instrucao = `SELECT componente, idComponente FROM componente join maquina on idMaquina where idMaquina = ${maquina};`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




function salvarAlertaCritico(maquina, idComponente, fkComponente, fkMaquina, valor) {
    var instrucao = `UPDATE configuracao join componente on idComponente
SET minimoParaSerMedio = ${valor * 0.50}, 
    minimoParaSerRuim = ${valor * 0.90},
    dataModificacao = now()
WHERE fkComponente = ${fkComponente} AND idComponente = ${idComponente} AND fkMaquina = ${fkMaquina};`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




function carregaridComponente(componente, maquina) {
    var instrucao = `SELECT idComponente, fkMaquina, fkComponente, minimoParaSerMedio FROM componente join configuracao 
on idComponente = fkComponente join maquina 
on idMaquina = fkMaquina join usuario 
on idUsuario = fkUsuario where idComponente = "${componente}" AND idMaquina = ${maquina};`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




module.exports = {
    carregarInfosMaquina,
    carregarInfosComponente,
    salvarAlertaCritico,
    carregaridComponente
};