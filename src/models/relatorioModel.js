let database = require("../database/config");

function buscarQtdRelatorios(idUsuario, preferencias, tipo, idEmpresa) {
  let data = new Date(preferencias.data);
  let diaSemana = data.getDay();
  let isInicioSemana = diaSemana === 0;
  let isInicioMes = data.getDate() === 1;

  let query = "";

  if (tipo === "diario") {
    query += `
            SELECT DATE(captura.dataCaptura) AS data, COUNT(*) AS total_capturas, 'diários' as tipo_relatorio, maquina.idMaquina FROM captura
            JOIN componente ON captura.fkComponente = componente.idComponente JOIN maquina ON componente.fkMaquina = maquina.idMaquina JOIN ipv4 ON ipv4.fkMaquina = ipv4.idIpv4 JOIN usuario ON maquina.fkUsuario = usuario.idUsuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
            WHERE DATE(captura.dataCaptura) = '${preferencias.data} and empresa.idEmpresa = ${idEmpresa}'
        `;
  } else if (tipo === "semanal" && isInicioSemana) {
    query += `
            SELECT YEAR(captura.dataCaptura) AS ano, WEEK(captura.dataCaptura, 0) AS semana, MIN(captura.dataCaptura) AS data_inicio_semana, MAX(captura.dataCaptura) AS data_fim_semana, COUNT(*) AS total_capturas, 'semanal' as tipo_relatorio, maquina.idMaquina FROM captura
            JOIN componente ON captura.fkComponente = componente.idComponente JOIN maquina ON componente.fkMaquina = maquina.idMaquina JOIN ipv4 ON ipv4.fkMaquina = ipv4.idIpv4 JOIN usuario ON maquina.fkUsuario = usuario.idUsuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
            WHERE YEAR(captura.dataCaptura) = YEAR('${preferencias.data}') AND WEEK(captura.dataCaptura, 0) = WEEK('${preferencias.data}', 0) and empresa.idEmpresa = ${idEmpresa}
        `;
  } else if (tipo === "mensal" && isInicioMes) {
    query += `
            SELECT YEAR(dataCaptura) AS ano, MONTH(dataCaptura) AS mes, DATE_FORMAT(MIN(dataCaptura), '%Y-%m-01') AS data_inicio_mes, LAST_DAY(MAX(dataCaptura)) AS data_fim_mes, COUNT(*) AS total_capturas, 'mensal' as tipo_relatorio, maquina.idMaquina FROM captura 
            JOIN componente ON captura.fkComponente = componente.idComponente JOIN maquina ON componente.fkMaquina = maquina.idMaquina JOIN ipv4 ON ipv4.fkMaquina = ipv4.idIpv4 JOIN usuario ON maquina.fkUsuario = usuario.idUsuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
            WHERE YEAR(dataCaptura) = YEAR('${preferencias.data}') AND MONTH(dataCaptura) = MONTH('${preferencias.data}') and empresa.idEmpresa = ${idEmpresa}
        `;
  }

  if (preferencias.responsaveis.proprio && query !== "") {
    query += ` and usuario.idUsuario = ${idUsuario.idUsuario}`;
  }
  if (preferencias.nomeIpv4 !== "" && query !== "") {
    query += ` and (ipv4.numeroIP = ${preferencias.nomeIpv4} || maquina.username = ${preferencias.nomeIpv4} || maquina.hostname = ${preferencias.nomeIpv4})`;
  }

  if (tipo === "diario" && query !== "") {
    query += `
          GROUP BY data, maquina.idMaquina
          ORDER BY data;
      `;
  } else if (tipo === "semanal" && isInicioSemana && query !== "") {
    query += `
          GROUP BY ano, semana, maquina.idMaquina
          ORDER BY ano, semana;
      `;
  } else if (tipo === "mensal" && isInicioMes && query !== "") {
    query += `
          GROUP BY ano, mes, maquina.idMaquina;
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

  const queryBase = `
    SELECT 
      componente.componente,
      captura.dadoCaptura, 
      captura.dataCaptura
    FROM captura 
    JOIN componente ON componente.idComponente = captura.fkComponente 
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
      query = `${queryBase} YEAR(captura.dataCaptura) = YEAR('${year}-${month}-${day}') AND WEEK(captura.dataCaptura, 0) = WEEK('${year}-${month}-${day}', 0)`;
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
    SELECT captura.dadoCaptura, captura.unidadeMedida, dataCaptura, componente.componente, captura.idCaptura
      FROM captura 
        JOIN componente ON componente.idComponente = captura.fkComponente 
        JOIN maquina ON maquina.idMaquina = componente.fkMaquina 
        WHERE dataCaptura >= "${dados.dataInicio}" AND dataCaptura <= "${dados.dataFim}" AND maquina.idMaquina = ${idMaquina} ;
  `;

  return database.executar(query);
}

module.exports = {
  buscarQtdRelatorios,
  infoCapturasData,
  gerarDadosParaExcel,
};
