const database = require("../database/config");

const selecionaUsuarioLogado = async (idUsuario) => {
  let instrucao = `SELECT usuario.*, empresa.nome as nomeEmpresa, empresa.cnpj, empresa.idEmpresa, empresa.fkPlano, endereco.*, contato.* FROM usuario JOIN empresa on usuario.fkEmpresa = empresa.idEmpresa JOIN endereco ON endereco.fkEmpresa = empresa.idEmpresa JOIN contato ON contato.fkUsuario = usuario.idUsuario WHERE usuario.idUsuario = ${idUsuario};`;
  console.log("Executando instrução: " + instrucao);

  return await database.executar(instrucao);
};

module.exports = {
  selecionaUsuarioLogado,
};
