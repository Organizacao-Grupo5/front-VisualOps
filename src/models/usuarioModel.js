var database = require("../database/config");

function cadastrar(nome, email, senha, cargo, fkEmpresa) {
  var instrucao = `INSERT INTO usuario (nome, email, senha, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cargo}', ${fkEmpresa})`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function autenticar(email, senha) {
  var instrucao = `SELECT idUsuario as id, usuario.nome, usuario.email, empresa.nome as nomeEmpresa, usuario.fkEmpresa, usuario.imagemPerfil FROM usuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa WHERE email = '${email}' AND senha = '${senha}'`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listar(idUsuario) {
  const query = `SELECT * FROM usuario WHERE idUsuario = ${idUsuario}`;

  console.log("Executando a instrução SQL: \n" + query);
  return database.executar(query);
}
const verificarAlerta = (idUsuario) => {
  const query = `
        WITH CapturaMaisRecente AS (
        SELECT c1.*
        FROM captura c1
        INNER JOIN (
            SELECT fkComponente, MAX(dataCaptura) AS maxDataCaptura
            FROM captura
            GROUP BY fkComponente
        ) c2 ON c1.fkComponente = c2.fkComponente AND c1.dataCaptura = c2.maxDataCaptura
        )
        SELECT ra.*, a.*, c.*, co.*, m.*
        FROM registroAlerta ra
        JOIN alerta a ON ra.fkAlerta = a.idAlerta
        JOIN CapturaMaisRecente c ON c.idCaptura = ra.fkCaptura
        JOIN componente co ON c.fkComponente = co.idComponente
        JOIN maquina m ON m.idMaquina = co.fkMaquina
        WHERE m.fkUsuario = ${idUsuario} AND ra.visualizado = 0
        ORDER BY ra.idRegistroAlertas DESC
        LIMIT 10;
`;

  console.log(query);
  return database.executar(query).then((result) => {
    if (result.length === 0) {
      return [];
    }
    return result;
  });
};

const carregarMaisAlertas = (idUsuario, ultimoId) => {
    const query = `  
      SELECT ra.*, a.*, c.*, co.*, m.*
      FROM registroAlerta ra
      JOIN captura c ON c.idCaptura = ra.fkCaptura
      JOIN alerta a ON ra.fkAlerta = a.idAlerta
      JOIN componente co ON c.fkComponente = co.idComponente
      JOIN maquina m ON m.idMaquina = co.fkMaquina
      WHERE m.fkUsuario = ${idUsuario} AND ra.visualizado = 0 AND ra.idRegistroAlertas < ${ultimoId}
      ORDER BY ra.idRegistroAlertas DESC
      LIMIT 10;
  `;
  
    console.log("Query:", query);
    return database.executar(query)
      .then((result) => {
        console.log("Resultado da consulta:", result); 
        if (result.length === 0) {
          console.log("Nenhum resultado encontrado."); 
          return [];
        }
        console.log("Resultados encontrados:", result);
        return result;
      })
      .catch((error) => {
        console.error("Erro ao executar a consulta:", error); 
        throw error; 
      });
  };
  

const updateAlertaVisualizado = (idCaptura, idAlerta) => {
  let query = `
        UPDATE registroAlerta
        SET visualizado = 1
        WHERE fkCaptura = ${idCaptura} AND idRegistroAlertas = ${idAlerta};
    `;

  console.log(query);

  return database.executar(query);
};

module.exports = {
  cadastrar,
  autenticar,
  listar,
  verificarAlerta,
  updateAlertaVisualizado,
  carregarMaisAlertas,
};
