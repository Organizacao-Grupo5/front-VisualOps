let database = require("../database/config");

function buscarQtdRelatorios(idUsuario, preferencias, tipo, idEmpresa) {
  let data = new Date(preferencias.data);
  let diaSemana = data.getDay();
  let isInicioSemana = diaSemana === 0;
  let isInicioMes = data.getDate() === 1;

  if (tipo === "mensal" && isInicioMes) {
    data.setMonth(data.getMonth() - 1);
  }

  let moreWhere = "";
  if (preferencias.responsaveis.proprio) {
    moreWhere += ` AND usuario.idUsuario = ${idUsuario.idUsuario}`;
  }
  if (preferencias.nomeIpv4 !== "") {
    moreWhere += ` AND (ipv4.numeroIP = '${preferencias.nomeIpv4}' OR usuario.nome = '${preferencias.nomeIpv4}')`;
  }

  let query = "";
  if (tipo === "diario") {
    query += `
        SELECT
            data,
            idMaquina,
            usuario,
            SUM(total) AS total_atividades,
            'diários' AS tipo_relatorio
        FROM (
            SELECT
                DATE(captura.dataCaptura) AS data,
                maquina.idMaquina,
                COUNT(*) AS total,
                usuario.nome AS usuario
            FROM
                captura
            JOIN
                componente ON captura.fkComponente = componente.idComponente
            JOIN
                maquina ON componente.fkMaquina = maquina.idMaquina
            JOIN
                usuario ON maquina.fkUsuario = usuario.idUsuario
            JOIN
                empresa ON usuario.fkEmpresa = empresa.idEmpresa
            ${
              preferencias.nomeIpv4 !== ""
                ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
                : ""
            }
            WHERE
                empresa.idEmpresa = ${idEmpresa}
                AND DATE(captura.dataCaptura) = '${preferencias.data}'
                ${moreWhere}
            GROUP BY
                data,
                maquina.idMaquina,
                usuario.nome

            UNION ALL

            SELECT
                DATE(appAcessado.hora) AS data,
                maquina.idMaquina,
                COUNT(*) AS total,
                usuario.nome AS usuario
            FROM
                appAcessado
            JOIN
                maquina ON appAcessado.fkMaquina = maquina.idMaquina
            JOIN
                apps ON appAcessado.fkApp = apps.idApp
            JOIN
                usuario ON maquina.fkUsuario = usuario.idUsuario
            JOIN
                empresa ON usuario.fkEmpresa = empresa.idEmpresa
            ${
              preferencias.nomeIpv4 !== ""
                ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
                : ""
            }
            WHERE
                empresa.idEmpresa = ${idEmpresa}
                AND DATE(appAcessado.hora) = '${preferencias.data}'
                ${moreWhere}
            GROUP BY
                data,
                maquina.idMaquina,
                usuario.nome
        ) AS combined_results
        GROUP BY
            data,
            idMaquina,
            usuario
        ORDER BY
            data;
    `;
  } else if (tipo === "semanal" && isInicioSemana) {
    query += `
        SELECT
            semana,
            DATE_ADD(
                STR_TO_DATE(CONCAT(SUBSTRING(semana, 1, 4), '0101'), '%Y%j'),
                INTERVAL (CAST(SUBSTRING(semana, 5) AS UNSIGNED) - 1) * 7 + (2 - WEEKDAY(STR_TO_DATE(CONCAT(SUBSTRING(semana, 1, 4), '0104'), '%Y%j'))) DAY
            ) AS data_inicio_semana,
            '${preferencias.data}' AS data,
            idMaquina,
            SUM(total) AS total_atividades,
            usuario,
            'semanais' AS tipo_relatorio
        FROM (
            SELECT
                YEARWEEK(captura.dataCaptura, 1) AS semana,
                maquina.idMaquina,
                COUNT(*) AS total,
                usuario.nome AS usuario
            FROM
                captura
            JOIN
                componente ON captura.fkComponente = componente.idComponente
            JOIN
                maquina ON componente.fkMaquina = maquina.idMaquina
            JOIN
                usuario ON maquina.fkUsuario = usuario.idUsuario
            JOIN
                empresa ON usuario.fkEmpresa = empresa.idEmpresa
            ${
              preferencias.nomeIpv4 !== ""
                ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
                : ""
            }
            WHERE
                empresa.idEmpresa = ${idEmpresa}
                AND YEARWEEK(captura.dataCaptura, 1) = YEARWEEK('${
                  preferencias.data
                }', 1)
                ${moreWhere}
            GROUP BY
                semana,
                maquina.idMaquina,
                usuario.nome

            UNION ALL

            SELECT
                YEARWEEK(appAcessado.hora, 1) AS semana,
                maquina.idMaquina,
                COUNT(*) AS total,
                usuario.nome AS usuario
            FROM
                appAcessado
            JOIN
                maquina ON appAcessado.fkMaquina = maquina.idMaquina
            JOIN
                apps ON appAcessado.fkApp = apps.idApp
            JOIN
                usuario ON maquina.fkUsuario = usuario.idUsuario
            JOIN
                empresa ON usuario.fkEmpresa = empresa.idEmpresa
            ${
              preferencias.nomeIpv4 !== ""
                ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
                : ""
            }
            WHERE
                empresa.idEmpresa = ${idEmpresa}
                AND YEARWEEK(appAcessado.hora, 1) = YEARWEEK('${
                  preferencias.data
                }', 1)
                ${moreWhere}
            GROUP BY
                semana,
                maquina.idMaquina,
                usuario.nome
        ) AS combined_results
        GROUP BY
            semana,
            data_inicio_semana,
            idMaquina,
            usuario
        ORDER BY
            semana;
    `;
  } else if (tipo === "mensal" && isInicioMes) {
    let data = new Date(preferencias.data);
    data.setMonth(data.getMonth() - 1);
    data.setDate(1);
    let dataFormatada = data.toISOString().split("T")[0];
    query += `
          SELECT
              ano_mes,
              idMaquina,
              SUM(total) AS total_atividades,
              'mensal' AS tipo_relatorio,
              usuario
          FROM (
              SELECT
                  DATE_FORMAT(captura.dataCaptura, '%Y-%m') AS ano_mes,
                  maquina.idMaquina,
                  COUNT(*) AS total,
                  usuario.nome AS usuario
              FROM
                  captura
              JOIN
                  componente ON captura.fkComponente = componente.idComponente
              JOIN
                  maquina ON componente.fkMaquina = maquina.idMaquina
              JOIN
                  usuario ON maquina.fkUsuario = usuario.idUsuario
              JOIN
                  empresa ON usuario.fkEmpresa = empresa.idEmpresa
              ${
                preferencias.nomeIpv4 !== ""
                  ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
                  : ""
              }
              WHERE
                  empresa.idEmpresa = ${idEmpresa}
                  AND DATE_FORMAT(captura.dataCaptura, '%Y-%m') = DATE_FORMAT('${dataFormatada}', '%Y-%m')
                  ${moreWhere}
              GROUP BY
                  ano_mes,
                  maquina.idMaquina,
                  usuario.nome
  
              UNION ALL
  
              SELECT
                  DATE_FORMAT(appAcessado.hora, '%Y-%m') AS ano_mes,
                  maquina.idMaquina,
                  COUNT(*) AS total,
                  usuario.nome AS usuario
              FROM
                  appAcessado
              JOIN
                  maquina ON appAcessado.fkMaquina = maquina.idMaquina
              JOIN
                  apps ON appAcessado.fkApp = apps.idApp
              JOIN
                  usuario ON maquina.fkUsuario = usuario.idUsuario
              JOIN
                  empresa ON usuario.fkEmpresa = empresa.idEmpresa
              ${
                preferencias.nomeIpv4 !== ""
                  ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
                  : ""
              }
              WHERE
                  empresa.idEmpresa = ${idEmpresa}
                  AND DATE_FORMAT(appAcessado.hora, '%Y-%m') = DATE_FORMAT('${dataFormatada}', '%Y-%m')
                  ${moreWhere}
              GROUP BY
                  ano_mes,
                  maquina.idMaquina,
                  usuario.nome
          ) AS combined_results
          GROUP BY
              ano_mes,
              idMaquina,
              usuario
          ORDER BY
              ano_mes;
      `;
  }

  console.log(query);

  if (query !== "") {
    return database.executar(query);
  } else {
    return;
  }
}

function infoCapturasData(infos, idUser) {
  console.log(infos);

  const queryBaseCaptura = `
    SELECT 
        'captura' AS tipo,
        componente.componente,
        captura.dadoCaptura,
        captura.dataCaptura,
        captura.unidadeMedida,
        componente.fkMaquina,
        NULL AS nomeApp,
        NULL AS pid,
        NULL AS localidade
    FROM 
        captura 
    JOIN 
        componente ON componente.idComponente = captura.fkComponente 
    WHERE`;

  const queryBaseApp = `
    SELECT 
        'app' AS tipo,
        apps.nomeApp AS componente,
        apps.ramConsumida AS dadoCaptura,
        appAcessado.hora AS dataCaptura,
        'MB' AS unidadeMedida,
        appAcessado.fkMaquina,
        apps.nomeApp,
        apps.pid,
        apps.localidade
    FROM 
        appAcessado
    JOIN 
        apps ON appAcessado.fkApp = apps.idApp
    WHERE`;

  let queryCaptura = "";
  let queryApp = "";
  const date = new Date(infos.data);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");

  switch (infos.tipo_relatorio) {
    case "diários":
      queryCaptura = `${queryBaseCaptura} DATE(captura.dataCaptura) = '${year}-${month}-${day}'`;
      queryApp = `${queryBaseApp} DATE(appAcessado.hora) = '${year}-${month}-${day}'`;
      break;
    case "semanais":
      queryCaptura = `${queryBaseCaptura} YEAR(captura.dataCaptura) = YEAR('${year}-${month}-${day}') 
                      AND WEEK(captura.dataCaptura, 1) = WEEK('${year}-${month}-${day}', 1)`;
      queryApp = `${queryBaseApp} YEAR(appAcessado.hora) = YEAR('${year}-${month}-${day}') 
                  AND WEEK(appAcessado.hora, 1) = WEEK('${year}-${month}-${day}', 1)`;
      break;
    case "mensal":
      queryCaptura = `${queryBaseCaptura} DATE_FORMAT(captura.dataCaptura, '%Y-%m') = '${year}-${month}'`;
      queryApp = `${queryBaseApp} DATE_FORMAT(appAcessado.hora, '%Y-%m') = '${year}-${month}'`;
      break;
    default:
      console.error("Tipo de intervalo inválido");
      return;
  }

  queryCaptura += ` AND componente.fkMaquina = ${infos.idMaquina}`;
  queryApp += ` AND appAcessado.fkMaquina = ${infos.idMaquina}`;

  const queryFinal = `
    (${queryCaptura})
    UNION ALL
    (${queryApp})
    ORDER BY dataCaptura;
  `;

  console.log(queryFinal);

  return database.executar(queryFinal);
}

function gerarDadosParaExcel(dados, idMaquina) {
  const dataInicio = new Date(dados.dataInicio).toISOString().substring(0, 10);
  const dataFim = new Date(dados.dataFim).toISOString().substring(0, 10);

  console.log(dados);

  const query = `
    SELECT 
        captura.dadoCaptura, 
        captura.unidadeMedida, 
        dataCaptura, 
        componente.componente, 
        captura.idCaptura, 
        usuario.nome as nomeUsuario, 
        empresa.nome as nomeEmpresa
    FROM 
        captura 
    JOIN 
        componente ON componente.idComponente = captura.fkComponente 
    JOIN 
        maquina ON maquina.idMaquina = componente.fkMaquina 
    JOIN 
        usuario ON maquina.fkUsuario = usuario.idUsuario
    JOIN 
        empresa ON usuario.fkEmpresa = empresa.idEmpresa
    WHERE 
        DATE(dataCaptura) >= "${dataInicio}" 
        AND DATE(dataCaptura) <= "${dataFim}" 
        AND maquina.idMaquina = ${idMaquina};
  `;
  console.log(query);
  return database.executar(query);
}

const selecionaUsuarioMaquina = async (idMaquina) => {
  let instrucao = `
        SELECT 
            usuario.*, 
            maquina.*,
            GROUP_CONCAT(IFNULL(ipv4.idIpv4, '---') SEPARATOR ',') AS idIpv4,
            GROUP_CONCAT(IFNULL(ipv4.numeroIP, '---') SEPARATOR ',') AS numeroIP,
            GROUP_CONCAT(IFNULL(ipv4.nomeLocal, '---') SEPARATOR ',') AS nomeLocal
        FROM usuario 
        JOIN maquina ON usuario.idUsuario = maquina.fkUsuario
        JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina
        WHERE maquina.idMaquina = ${idMaquina};
    `;

  console.log(instrucao);
  return await database.executar(instrucao);
};

module.exports = {
  buscarQtdRelatorios,
  infoCapturasData,
  gerarDadosParaExcel,
  selecionaUsuarioMaquina,
};
