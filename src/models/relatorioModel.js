let database = require("../database/config");

function buscarQtdRelatorios(idUsuario, preferencias, tipo, idEmpresa) {
  let data = new Date(preferencias.data);
  let diaSemana = data.getDay();
  let isInicioSemana = diaSemana === 0;
  let isInicioMes = data.getDate() === 1;

  if (tipo === "mensal" && isInicioMes) {
    data.setMonth(data.getMonth() - 1);
  }

  let query = "";

  if (tipo === "diario") {
    query += `
        SELECT
            data,
            idMaquina,
            SUM(total) AS total_atividades,
            'diários' AS tipo_relatorio
        FROM (
            SELECT
                DATE(captura.dataCaptura) AS data,
                maquina.idMaquina,
                COUNT(*) AS total
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
            GROUP BY
                data,
                maquina.idMaquina

            UNION ALL

            SELECT
                DATE(appAcessado.hora) AS data,
                maquina.idMaquina,
                COUNT(*) AS total
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
            GROUP BY
                data,
                maquina.idMaquina
        ) AS combined_results
        GROUP BY
            data,
            idMaquina
        ORDER BY
            data;
    `;
  } else if (tipo === "semanal" && isInicioSemana) {
    query += `
        SELECT
            semana,
            idMaquina,
            SUM(total) AS total_atividades,
            'semanais' AS tipo_relatorio
        FROM (
            SELECT
                YEARWEEK(captura.dataCaptura, 1) AS semana,
                maquina.idMaquina,
                COUNT(*) AS total
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
            GROUP BY
                semana,
                maquina.idMaquina

            UNION ALL

            SELECT
                YEARWEEK(appAcessado.hora, 1) AS semana,
                maquina.idMaquina,
                COUNT(*) AS total
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
            GROUP BY
                semana,
                maquina.idMaquina
        ) AS combined_results
        GROUP BY
            semana,
            idMaquina
        ORDER BY
            semana;
    `;
  } else if (tipo === "mensal" && isInicioMes) {
    let data = new Date(preferencias.data);
    data.setMonth(data.getMonth() - 1);
    data.setDate(1);
    let dataFormatada = data.toISOString().split('T')[0];
    query += `
          SELECT
              ano_mes,
              idMaquina,
              SUM(total) AS total_atividades,
              'mensal' AS tipo_relatorio
          FROM (
              SELECT
                  DATE_FORMAT(captura.dataCaptura, '%Y-%m') AS ano_mes,
                  maquina.idMaquina,
                  COUNT(*) AS total
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
              GROUP BY
                  ano_mes,
                  maquina.idMaquina
  
              UNION ALL
  
              SELECT
                  DATE_FORMAT(appAcessado.hora, '%Y-%m') AS ano_mes,
                  maquina.idMaquina,
                  COUNT(*) AS total
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
              GROUP BY
                  ano_mes,
                  maquina.idMaquina
          ) AS combined_results
          GROUP BY
              ano_mes,
              idMaquina
          ORDER BY
              ano_mes;
      `;
  }

  if (preferencias.responsaveis.proprio && query !== "") {
    query += ` AND usuario.idUsuario = ${idUsuario.idUsuario}`;
  }
  if (preferencias.nomeIpv4 !== "" && query !== "") {
    query += ` AND ipv4.numeroIP = '${preferencias.nomeIpv4}'`;
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

  const queryBase = `
    SELECT 
        componente.componente,
        captura.dadoCaptura, 
        captura.dataCaptura,
        captura.unidadeMedida,
        componente.fkMaquina
    FROM 
        captura 
    JOIN 
        componente ON componente.idComponente = captura.fkComponente 
    WHERE`;

  let query = "";
  const date = new Date(infos.data);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");

  switch (infos.tipo_relatorio) {
    case "diários":
      query = `${queryBase} DATE(captura.dataCaptura) = '${year}-${month}-${day}'`;
      break;
    case "semanal":
      query = `${queryBase} YEAR(captura.dataCaptura) = YEAR('${year}-${month}-${day}') 
                      AND WEEK(captura.dataCaptura, 0) = WEEK('${year}-${month}-${day}', 0)`;
      break;
    case "mensal":
      query = `${queryBase} DATE_FORMAT(captura.dataCaptura, '%Y-%m') = '${year}-${month}'`;
      break;
    default:
      console.error("Tipo de intervalo inválido");
      return;
  }

  query += ` AND componente.fkMaquina = ${infos.idMaquina}`;

  query += " ORDER BY componente.componente, captura.dataCaptura;";

  console.log(query);

  return database.executar(query);
}

function gerarDadosParaExcel(dados, idMaquina) {
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
        dataCaptura >= "${dados.dataInicio}" 
        AND dataCaptura <= "${dados.dataFim}" 
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
