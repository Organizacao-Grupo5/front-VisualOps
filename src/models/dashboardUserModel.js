var database = require("../database/config");

function porcentagemUso(id) {
    var instrucao = `SELECT dadoCaptura, componente FROM captura JOIN componente ON componente.idComponente = captura.fkComponente JOIN maquina ON maquina.idMaquina = componente.fkMaquina JOIN usuario ON usuario.idUsuario = maquina.fkUsuario 
    JOIN (SELECT fkComponente, MAX(dataCaptura) AS MaxDate FROM captura GROUP BY fkComponente) AS LatestCaptura ON captura.fkComponente = LatestCaptura.fkComponente 
        AND captura.dataCaptura = LatestCaptura.MaxDate WHERE usuario.idUsuario = ${id} AND componente.componente IN ('MemoriaRam', 'HDD', 'CPU', 'GPU', 'Volume') ORDER BY componente.componente;`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function desempenho(id) {
    var instrucao = `SELECT dadoCaptura, componente FROM captura JOIN componente ON componente.idComponente = captura.fkComponente JOIN maquina ON maquina.idMaquina = componente.fkMaquina JOIN usuario ON usuario.idUsuario = maquina.fkUsuario WHERE usuario.idUsuario = ${id} AND componente.componente IN ('MemoriaRam', 'HDD', 'CPU', 'GPU', 'Volume') ORDER BY dataCaptura DESC LIMIT 120;;
`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function historicoDesempenho(id) {
    var instrucao = `WITH UltimasDatas AS (
    SELECT
        componente.idComponente,
        MAX(CASE 
            WHEN captura.dataCaptura >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) 
                 AND captura.dataCaptura < DATE_SUB(CURDATE(), INTERVAL 29 DAY) 
            THEN captura.dataCaptura 
            END) AS data_30_dias_atras,
        MAX(CASE 
            WHEN captura.dataCaptura >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) 
                 AND captura.dataCaptura < DATE_SUB(CURDATE(), INTERVAL 6 DAY) 
            THEN captura.dataCaptura 
            END) AS data_7_dias_atras,
        MAX(CASE 
            WHEN DATE(captura.dataCaptura) = CURDATE() 
            THEN captura.dataCaptura 
            END) AS data_hoje
    FROM
        captura
    JOIN
        componente ON componente.idComponente = captura.fkComponente
    JOIN
        maquina ON maquina.idMaquina = componente.fkMaquina
    JOIN
        usuario ON usuario.idUsuario = maquina.fkUsuario
    WHERE
        usuario.idUsuario = ${id}
        AND componente.componente IN ('MemoriaRam', 'HDD', 'CPU', 'GPU', 'Volume')
    GROUP BY
        componente.idComponente
)

-- Consulta principal usando a CTE
SELECT 
    '30 dias atras' AS periodo, 
    componente.componente, 
    captura.dadoCaptura AS media
FROM 
    captura
JOIN 
    componente ON componente.idComponente = captura.fkComponente
JOIN 
    UltimasDatas ON UltimasDatas.idComponente = componente.idComponente
JOIN 
    maquina ON maquina.idMaquina = componente.fkMaquina
JOIN 
    usuario ON usuario.idUsuario = maquina.fkUsuario
WHERE 
    captura.dataCaptura = UltimasDatas.data_30_dias_atras
    AND usuario.idUsuario = ${id}
    AND componente.componente IN ('MemoriaRam', 'HDD', 'CPU', 'GPU', 'Volume')

UNION ALL

SELECT 
    '7 dias atras' AS periodo, 
    componente.componente, 
    captura.dadoCaptura AS media
FROM 
    captura
JOIN 
    componente ON componente.idComponente = captura.fkComponente
JOIN 
    UltimasDatas ON UltimasDatas.idComponente = componente.idComponente
JOIN 
    maquina ON maquina.idMaquina = componente.fkMaquina
JOIN 
    usuario ON usuario.idUsuario = maquina.fkUsuario
WHERE 
    captura.dataCaptura = UltimasDatas.data_7_dias_atras
    AND usuario.idUsuario = ${id}
    AND componente.componente IN ('MemoriaRam', 'HDD', 'CPU', 'GPU', 'Volume')

UNION ALL

SELECT 
    'Hoje' AS periodo, 
    componente.componente, 
    captura.dadoCaptura AS media
FROM 
    captura
JOIN 
    componente ON componente.idComponente = captura.fkComponente
JOIN 
    UltimasDatas ON UltimasDatas.idComponente = componente.idComponente
JOIN 
    maquina ON maquina.idMaquina = componente.fkMaquina
JOIN 
    usuario ON usuario.idUsuario = maquina.fkUsuario
WHERE 
    captura.dataCaptura = UltimasDatas.data_hoje
    AND usuario.idUsuario = ${id}
    AND componente.componente IN ('MemoriaRam', 'HDD', 'CPU', 'GPU', 'Volume');`;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    porcentagemUso,
    desempenho,
    historicoDesempenho
};