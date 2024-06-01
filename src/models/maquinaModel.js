var database = require("../database/config");

function cadastrar(numeroIdentificacao, marca, modelo, fkUsuario) {
  var instrucao = `
        INSERT INTO maquina (numeroIdentificacao, marca, modelo, fkUsuario) VALUES ('${numeroIdentificacao}', '${marca}', ${modelo}, '${fkUsuario}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function listarMaquinas(empresa) {
  console.log(empresa);
  let instrucao = `
        SELECT 
            maquina.idMaquina,
            IFNULL(maquina.numeroIdentificacao, '---') AS numeroIdentificacao,
            IFNULL(maquina.modelo, '---') AS modelo,
            IFNULL(maquina.marca, '---') AS marca,
            IFNULL(maquina.username, '---') AS username,
            IFNULL(maquina.hostname, '---') AS hostname,
            IFNULL(usuario.idUsuario, '---') AS idUsuario,
            IFNULL(usuario.nome, '---') AS nome,
            IFNULL(usuario.email, '---') AS email,
            IFNULL(usuario.senha, '---') AS senha,
            IFNULL(usuario.cargo, '---') AS cargo,
            IFNULL(empresa.idEmpresa, '---') AS idEmpresa,
            IFNULL(empresa.cnpj, '---') AS cnpj,
            IFNULL(empresa.fkPlano, '---') AS fkPlano,
            GROUP_CONCAT(IFNULL(ipv4.idIpv4, '---') SEPARATOR ',') AS idIpv4,
            GROUP_CONCAT(IFNULL(ipv4.numeroIP, '---') SEPARATOR ',') AS numeroIP,
            GROUP_CONCAT(IFNULL(ipv4.nomeLocal, '---') SEPARATOR ',') AS nomeLocal
        FROM 
            maquina 
        JOIN 
            usuario ON maquina.fkUsuario = usuario.idUsuario 
        JOIN 
            empresa ON usuario.fkEmpresa = empresa.idEmpresa 
        LEFT JOIN 
            ipv4 ON ipv4.fkMaquina = maquina.idMaquina 
        WHERE 
            empresa.idEmpresa = ${empresa.idEmpresa}
        GROUP BY 
            maquina.idMaquina, 
            maquina.numeroIdentificacao,
            maquina.modelo,
            maquina.marca,
            maquina.username,
            maquina.hostname,
            usuario.idUsuario,
            usuario.nome,
            usuario.email,
            usuario.senha,
            usuario.cargo,
            empresa.idEmpresa,
            empresa.cnpj,
            empresa.fkPlano;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao).then((result) => {
    return result.map((row) => {
      return {
        idMaquina: row.idMaquina,
        numeroIdentificacao: row.numeroIdentificacao,
        modelo: row.modelo,
        marca: row.marca,
        username: row.username,
        hostname: row.hostname,
        idUsuario: row.idUsuario,
        nome: row.nome,
        email: row.email,
        senha: row.senha,
        cargo: row.cargo,
        idEmpresa: row.idEmpresa,
        cnpj: row.cnpj,
        fkPlano: row.fkPlano,
        idIpv4: row.idIpv4 ? row.idIpv4.split(",") : [],
        numeroIP: row.numeroIP ? row.numeroIP.split(",") : [],
        nomeLocal: row.nomeLocal ? row.nomeLocal.split(",") : [],
      };
    });
  });
}

const buscarFuncionarios = async (preferencia) => {
  const instrucao = `
    SELECT * FROM usuario WHERE nome LIKE '%${preferencia.campo}%' AND fkEmpresa = ${preferencia.idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);

  try {
    const resultado = await database.executar(instrucao);
    return resultado;
  } catch (erro) {
    console.error("Erro ao executar a instrução SQL:", erro);
    throw erro;
  }
};

const salvarMaquina = async (infos) => {
  let instrucaoVerificarSenha = `
    SELECT * FROM usuario WHERE idUsuario = ${infos.idUsuarioLogado} AND senha = '${infos.senhaUsuario}' AND fkEmpresa = ${infos.idEmpresa};
  `;

  console.log(
    "Executando a instrução SQL para verificar a senha: \n" +
      instrucaoVerificarSenha
  );
  let resultadoVerificarSenha = await database.executar(
    instrucaoVerificarSenha
  );

  if (resultadoVerificarSenha.length === 0) {
    throw new Error("Senha inválida");
  }

  let instrucaoMaquina = `
    INSERT INTO maquina (marca, modelo, fkUsuario) VALUES ('${infos.marca}', '${infos.modelo}', ${infos.fkUsuario});
  `;
  console.log(
    "Executando a instrução SQL para inserir na tabela 'maquina': \n" +
      instrucaoMaquina
  );

  let resultadoInsercaoMaquina = await database.executar(instrucaoMaquina);

  if (resultadoInsercaoMaquina.insertId <= 0) {
    throw new Error("Erro ao inserir na tabela 'maquina'");
  }

  let idMaquinaInserido = resultadoInsercaoMaquina.insertId;

  let instrucaoIpv4 = `
    INSERT INTO ipv4 (numeroIP, nomeLocal, fkMaquina, fkUsuario) VALUES 
    ('${infos.numeroIP1}', '${infos.nomeLocal1}', ${idMaquinaInserido}, ${infos.fkUsuario}),
    ('${infos.numeroIP2}', '${infos.nomeLocal2}', ${idMaquinaInserido}, ${infos.fkUsuario});
  `;
  console.log(
    "Executando a instrução SQL para inserir na tabela 'ipv4': \n" +
      instrucaoIpv4
  );

  await database.executar(instrucaoIpv4);
};

const deletarMaquina = async (infos, idMaquina) => {
  let instrucaoVerificarSenha = `
  SELECT * FROM usuario WHERE idUsuario = ${infos.idUsuarioLogado} AND senha = '${infos.senhaUsuario}' AND fkEmpresa = ${infos.idEmpresa};
`;

  console.log(
    "Executando a instrução SQL para verificar a senha: \n" +
      instrucaoVerificarSenha
  );
  let resultadoVerificarSenha = await database.executar(
    instrucaoVerificarSenha
  );

  if (resultadoVerificarSenha.length === 0) {
    throw new Error("Senha inválida");
  }

  let instrucaoDelete = `
    DELETE FROM maquina WHERE idMaquina = ${idMaquina};
  `;

  await database.executar(instrucaoDelete);
};

const editarMaquina = async (infos, idMaquina) => {
  let instrucaoVerificarSenha = `
  SELECT * FROM usuario WHERE idUsuario = ${infos.idUsuarioLogado} AND senha = '${infos.senhaUsuario}' AND fkEmpresa = ${infos.idEmpresa};
  `;

  console.log(
    "Executando a instrução SQL para verificar a senha: \n" +
      instrucaoVerificarSenha
  );

  let resultadoVerificarSenha = await database.executar(
    instrucaoVerificarSenha
  );

  if (resultadoVerificarSenha.length === 0) {
    throw new Error("Senha inválida");
  }

  let instrucaoUpdateMaquina = `
    UPDATE maquina SET marca = '${infos.marca}', modelo = '${infos.modelo}', fkUsuario = ${infos.fkUsuario} WHERE idMaquina = ${idMaquina};
  `;

  console.log(
    "Executando a instrução SQL para atualizar a máquina: \n" +
      instrucaoUpdateMaquina
  );
  await database.executar(instrucaoUpdateMaquina);

  if (infos.numeroIP1 === "") {
    let instrucaoDeleteIpv4_1 = `DELETE FROM ipv4 WHERE idIpv4 = ${infos.idIpv41};`;
    console.log(
      "Executando a instrução SQL para deletar ipv4 (1): \n" +
        instrucaoDeleteIpv4_1
    );
    await database.executar(instrucaoDeleteIpv4_1);
  } else {
    let instrucaoUpdateIpv4_1 = `UPDATE ipv4 SET numeroIP = '${infos.numeroIP1}', nomeLocal = '${infos.nomeLocal1}' WHERE idIpv4 = ${infos.idIpv41};`;
    console.log(
      "Executando a instrução SQL para atualizar ipv4 (1): \n" +
        instrucaoUpdateIpv4_1
    );
    await database.executar(instrucaoUpdateIpv4_1);
  }

  if (infos.numeroIP2 === "") {
    let instrucaoDeleteIpv4_2 = `DELETE FROM ipv4 WHERE idIpv4 = ${infos.idIpv42};`;
    console.log(
      "Executando a instrução SQL para deletar ipv4 (2): \n" +
        instrucaoDeleteIpv4_2
    );
    await database.executar(instrucaoDeleteIpv4_2);
  } else {
    let instrucaoUpdateIpv4_2 = `UPDATE ipv4 SET numeroIP = '${infos.numeroIP2}', nomeLocal = '${infos.nomeLocal2}' WHERE idIpv4 = ${infos.idIpv42};`;
    console.log(
      "Executando a instrução SQL para atualizar ipv4 (2): \n" +
        instrucaoUpdateIpv4_2
    );
    await database.executar(instrucaoUpdateIpv4_2);
  }
};

module.exports = {
  cadastrar,
  listarMaquinas,
  buscarFuncionarios,
  salvarMaquina,
  deletarMaquina,
  editarMaquina,
};
