let database = require("../database/config");

function buscarQtdRelatorios(idUsuario, preferencias) {
  let query = `select componente.componente, count(distinct captura.fkComponente) as total_relatorio_dia from componente join captura on fkComponente = idComponente join maquina on componente.fkMaquina = maquina.idMaquina join usuario on maquina.fkUsuario = usuario.idUsuario join ipv4 on ipv4.fkMaquina = maquina.idMaquina where DATE(captura.dataCaptura) = '${preferencias.data}' `;

  if (preferencias.nomeIpv4 !== "" && preferencias.nomeIpv4 !== null) {
    query += ` and maquina.username = ${preferencias.nomeIpv4} || maquina.hostname = ${preferencias.nomeIpv4}|| ipv4.numeroIP = ${preferencias.nomeIpv4}`;
  }

  console.log(preferencias)

  let queryComponente = "";
  if (preferencias.componente.cpu === true) {
    queryComponente += ` and (componente.componente like 'CPU' `;
  }
  if (preferencias.componente.ram === true) {
    queryComponente += queryComponente != "" ? " || " : " and (";
    queryComponente += `componente.componente like 'MemoriaRam' `;
  }
  if (preferencias.componente.hdd === true) {
    queryComponente += queryComponente != "" ? " || " : " and (";
    queryComponente += `componente.componente like 'HDD' `;
  }
  if (preferencias.componente.gpu === true) {
    queryComponente += queryComponente != "" ? " || " : " and (";
    queryComponente += `componente.componente like 'GPU' `;
  }
  if (preferencias.componente.app === true) {
    queryComponente += queryComponente != "" ? " || " : " and (";
    queryComponente += `componente.componente like 'APP' `;
  }

  if (queryComponente !== "") {
    queryComponente += ")";
  }

  query += queryComponente;

  if (preferencias.responsaveis.proprio) {
    query += `and usuario.idUsuario = ${idUsuario.idUsuario} `;
  }

  query += ` group by componente.componente;`;

  console.log(query);

  return database.executar(query);
}

module.exports = {
  buscarQtdRelatorios,
};
