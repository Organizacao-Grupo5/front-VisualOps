const database = require("../database/config");

const selecionaUsuarioLogado = async (idUsuario) => {
  let instrucao = `SELECT usuario.*, empresa.nome as nomeEmpresa, empresa.cnpj, empresa.idEmpresa, empresa.fkPlano, endereco.* FROM usuario JOIN empresa on usuario.fkEmpresa = empresa.idEmpresa JOIN endereco ON endereco.fkEmpresa = empresa.idEmpresa WHERE usuario.idUsuario = ${idUsuario};`;
  console.log("Executando instrução: " + instrucao);

  return await database.executar(instrucao);
};

const selecionaContatosUsuarioLogado = async (idUsuario) => {
  let instrucao = `SELECT contato.* FROM contato JOIN usuario ON contato.fkUsuario = usuario.idUsuario WHERE usuario.idUsuario = ${idUsuario};`;
  console.log("Executando instrução: " + instrucao);

  return await database.executar(instrucao);
};

const atualizaInfosUsuario = async (idUsuario, infos) => {
  let instrucao = `UPDATE usuario set nome = '${infos.nome}', email = '${infos.email}', senha = '${infos.senha}', cargo = '${infos.cargo}', imagemPerfil = '${infos.imgUser}' WHERE idUsuario = ${idUsuario};`;

  console.log("Executando instrução: " + instrucao);

  return await database.executar(instrucao);
};

const atualizaContato = async (idContato, infos) => {
  let instrucao = `
    UPDATE contato set telefone = "${infos.telefone}", tipo = "${infos.tipo}" WHERE idContato = ${idContato};
  `;

  console.log("Executando instrução: " + instrucao);

  return await database.executar(instrucao);
};

const criaContato = async (idUsuario, infos) => {
  let instrucao = `
    INSERT INTO contato (telefone, tipo, fkUsuario) VALUES ("${infos.telefone}", "${infos.tipo}", ${idUsuario});
  `;

  console.log("Executando instrução: " + instrucao);

  return await database.executar(instrucao);
};

const deleteContact = async (idContato) => {
  let instrucao = `
    DELETE FROM contato WHERE idContato = ${idContato};
  `;

  console.log("Executando instrução: " + instrucao);

  return await database.executar(instrucao);
};

const updateEndereco = async (idEmpresa, infos) => {
  const instrucao = `
  UPDATE endereco 
  SET cep = "${infos.cep}", logradouro = "${infos.logradouro}", 
      numero = "${infos.numero}", bairro = "${infos.bairro}", 
      estado = "${infos.estado}", complemento = "${infos.complemento}"
  WHERE fkEmpresa = ${idEmpresa};
`;
  console.log("Executando instrução: " + instrucao);
  return await database.executar(instrucao);
};

module.exports = {
  selecionaUsuarioLogado,
  selecionaContatosUsuarioLogado,
  atualizaInfosUsuario,
  atualizaContato,
  criaContato,
  deleteContact,
  updateEndereco,
};
