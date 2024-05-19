let database = require("../database/config");

function buscarQtdRelatorios(idUsuario, preferencias, tipo) {
    let data = new Date(preferencias.data);
    let diaSemana = data.getDay();
    let isInicioSemana = diaSemana === 0; 
    let isInicioMes = data.getDate() === 1;

    let query = '';

    if (tipo === "diario") {
        query += `
            SELECT DATE(captura.dataCaptura) AS data, COUNT(*) AS total_capturas, 'diários' as tipo_relatorio FROM captura
            JOIN componente ON captura.fkComponente = componente.idComponente JOIN maquina ON componente.fkMaquina = maquina.idMaquina JOIN ipv4 ON ipv4.fkMaquina = ipv4.idIpv4 JOIN usuario ON maquina.fkUsuario = usuario.idUsuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
            WHERE DATE(captura.dataCaptura) = '${preferencias.data}'
        `;
    } else if (tipo === "semanal" && isInicioSemana) {
        query += `
            SELECT YEAR(captura.dataCaptura) AS ano, WEEK(captura.dataCaptura, 0) AS semana, MIN(captura.dataCaptura) AS data_inicio_semana, MAX(captura.dataCaptura) AS data_fim_semana, COUNT(*) AS total_capturas, 'semanal' as tipo_relatorio FROM captura
            JOIN componente ON captura.fkComponente = componente.idComponente JOIN maquina ON componente.fkMaquina = maquina.idMaquina JOIN ipv4 ON ipv4.fkMaquina = ipv4.idIpv4 JOIN usuario ON maquina.fkUsuario = usuario.idUsuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
            WHERE YEAR(captura.dataCaptura) = YEAR('${preferencias.data}') AND WEEK(captura.dataCaptura, 0) = WEEK('${preferencias.data}', 0)
        `;
    } else if (tipo === "mensal" && isInicioMes) {
        query += `
            SELECT YEAR(dataCaptura) AS ano, MONTH(dataCaptura) AS mes, DATE_FORMAT(MIN(dataCaptura), '%Y-%m-01') AS data_inicio_mes, LAST_DAY(MAX(dataCaptura)) AS data_fim_mes, COUNT(*) AS total_capturas, 'mensal' as tipo_relatorio FROM captura 
            JOIN componente ON captura.fkComponente = componente.idComponente JOIN maquina ON componente.fkMaquina = maquina.idMaquina JOIN ipv4 ON ipv4.fkMaquina = ipv4.idIpv4 JOIN usuario ON maquina.fkUsuario = usuario.idUsuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
            WHERE YEAR(dataCaptura) = YEAR('${preferencias.data}') AND MONTH(dataCaptura) = MONTH('${preferencias.data}')
        `;
    }

    if(preferencias.responsaveis.proprio && query !== ''){
      query += ` and usuario.idUsuario = ${idUsuario.idUsuario}`
    }
    if(preferencias.nomeIpv4 !== '' && query !== ''){
      query += ` and (ipv4.numeroIP = ${preferencias.nomeIpv4} || maquina.username = ${preferencias.nomeIpv4} || maquina.hostname = ${preferencias.nomeIpv4})`
    }

    if (tipo === "diario" && query !== '') {
      query += `
          GROUP BY data 
          ORDER BY data;
      `;
  } else if (tipo === "semanal" && isInicioSemana && query !== '') {
      query += `
          GROUP BY ano, semana
          ORDER BY ano, semana;
      `;
  } else if (tipo === "mensal" && isInicioMes && query !== '') {
      query += `
          GROUP BY ano, mes;
      `;
  }

    console.log("Query SQL:", query);

    if(query !== ''){
      return database.executar(query);
    } else{
      return
    }
}

module.exports = {
    buscarQtdRelatorios,
};
