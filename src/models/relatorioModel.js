let database = require("../database/config");

function buscarQtdRelatorios(idUsuario, preferencias, tipo, idEmpresa) {
  let data = new Date(preferencias.data);
  let diaSemana = data.getDay();
  let isInicioSemana = diaSemana === 0;
  let isInicioMes = data.getDate() === 1;

  let query = "";

  if (tipo === "diario") {
    query += `
        SELECT 
            DATE(captura.dataCaptura) AS data, 
            COUNT(*) AS total_capturas, 
            'diários' AS tipo_relatorio, 
            maquina.idMaquina 
        FROM 
            captura
        JOIN 
            componente ON captura.fkComponente = componente.idComponente 
        JOIN 
            maquina ON componente.fkMaquina = maquina.idMaquina 
        ${
          preferencias.nomeIpv4 !== ""
            ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
            : ""
        }   
        JOIN 
            usuario ON maquina.fkUsuario = usuario.idUsuario 
        JOIN 
            empresa ON usuario.fkEmpresa = empresa.idEmpresa
        WHERE 
            empresa.idEmpresa = 1
            AND DATE(captura.dataCaptura) = '${preferencias.data}'
        `;
  } else if (tipo === "semanal" && isInicioSemana) {
    query += `
        SELECT 
            YEAR(captura.dataCaptura) AS ano, 
            WEEK(captura.dataCaptura, 0) AS semana, 
            MIN(captura.dataCaptura) AS data_inicio_semana, 
            MAX(captura.dataCaptura) AS data_fim_semana, 
            COUNT(*) AS total_capturas, 
            'semanal' as tipo_relatorio, 
            maquina.idMaquina 
        FROM 
            captura
        JOIN 
            componente ON captura.fkComponente = componente.idComponente 
        JOIN 
            maquina ON componente.fkMaquina = maquina.idMaquina 
            ${
              preferencias.nomeIpv4 !== ""
                ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
                : ""
            }   
        JOIN 
            usuario ON maquina.fkUsuario = usuario.idUsuario 
        JOIN 
            empresa ON usuario.fkEmpresa = empresa.idEmpresa
        WHERE 
            YEAR(captura.dataCaptura) = YEAR('${preferencias.data}') 
            AND WEEK(captura.dataCaptura, 0) = WEEK('${preferencias.data}', 0) 
            AND empresa.idEmpresa = ${idEmpresa}
        `;
  } else if (tipo === "mensal" && isInicioMes) {
    query += `
        SELECT 
            YEAR(dataCaptura) AS ano, 
            MONTH(dataCaptura) AS mes, 
            DATE_FORMAT(MIN(dataCaptura), '%Y-%m-01') AS data_inicio_mes, 
            LAST_DAY(MAX(dataCaptura)) AS data_fim_mes, 
            COUNT(*) AS total_capturas, 
            'mensal' as tipo_relatorio, 
            maquina.idMaquina 
        FROM 
            captura 
        JOIN 
            componente ON captura.fkComponente = componente.idComponente 
        JOIN 
            maquina ON componente.fkMaquina = maquina.idMaquina 
            ${
              preferencias.nomeIpv4 !== ""
                ? "JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina"
                : ""
            }   
        JOIN 
            usuario ON maquina.fkUsuario = usuario.idUsuario 
        JOIN 
            empresa ON usuario.fkEmpresa = empresa.idEmpresa
        WHERE 
            YEAR(dataCaptura) = YEAR('${preferencias.data}') 
            AND MONTH(dataCaptura) = MONTH('${preferencias.data}') 
            AND empresa.idEmpresa = ${idEmpresa}
        `;
  }

  if (preferencias.responsaveis.proprio && query !== "") {
    query += ` AND usuario.idUsuario = ${idUsuario.idUsuario}`;
  }
  if (preferencias.nomeIpv4 !== "" && query !== "") {
    query += ` AND (ipv4.numeroIP = '${preferencias.nomeIpv4}'
                        OR maquina.username = '${preferencias.nomeIpv4}'
                        OR maquina.hostname = '${preferencias.nomeIpv4}')`;
  }

  if (tipo === "diario" && query !== "") {
    query += `
        GROUP BY 
            data, 
            maquina.idMaquina
        ORDER BY 
            data;
        `;
  } else if (tipo === "semanal" && isInicioSemana && query !== "") {
    query += `
        GROUP BY 
            ano, 
            semana, 
            maquina.idMaquina
        ORDER BY 
            ano, 
            semana;
        `;
  } else if (tipo === "mensal" && isInicioMes && query !== "") {
    query += `
        GROUP BY 
            ano, 
            mes, 
            maquina.idMaquina;
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

    console.log(instrucao)
    return await database.executar(instrucao);
}

module.exports = {
  buscarQtdRelatorios,
  infoCapturasData,
  gerarDadosParaExcel,
  selecionaUsuarioMaquina,
};
