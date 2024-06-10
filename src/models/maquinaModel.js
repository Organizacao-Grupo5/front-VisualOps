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
    INSERT INTO maquina (marca, modelo, numeroIdentificacao, fkUsuario, fkEmpresa) VALUES ('${infos.marca}', '${infos.modelo}', '${infos.patrimonio}', ${infos.fkUsuario}, ${infos.idEmpresa});
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
    INSERT INTO ipv4 (numeroIP, nomeLocal, fkMaquina) VALUES 
    ('${infos.numeroIP1}', '${infos.nomeLocal1}', ${idMaquinaInserido}),
    ('${infos.numeroIP2}', '${infos.nomeLocal2}', ${idMaquinaInserido});
  `;
  console.log(
    "Executando a instrução SQL para inserir na tabela 'ipv4': \n" +
      instrucaoIpv4
  );

  await database.executar(instrucaoIpv4);
};

const deletarMaquina = async (infos, idMaquina) => {
  let instrucaoVerificarSenha = `
  SELECT * FROM usuario WHERE idUsuario = ${infos.idUsuario} AND senha = '${infos.senhaUsuario}' AND fkEmpresa = ${infos.idEmpresa};
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
    UPDATE maquina SET marca = '${infos.marca}', modelo = '${infos.modelo}', fkUsuario = ${infos.fkUsuario}, numeroIdentificacao = '${infos.patrimonio}' WHERE idMaquina = ${idMaquina};
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
  } else if(infos.idIpv41 !== "" && infos.idIpv41 !== undefined){
    let instrucaoUpdateIpv4_1 = `UPDATE ipv4 SET numeroIP = '${infos.numeroIP1}', nomeLocal = '${infos.nomeLocal1}' WHERE idIpv4 = ${infos.idIpv41};`;
    console.log(
      "Executando a instrução SQL para atualizar ipv4 (1): \n" +
        instrucaoUpdateIpv4_1
    );
    await database.executar(instrucaoUpdateIpv4_1);
  } else{
    let instrucaoUpdateIpv4_1 = `INSERT INTO ipv4 (numeroIP, nomeLocal, fkMaquina, fkUsuario) VALUES ('${infos.numeroIP1}', '${infos.nomeLocal1}', ${idMaquina}, ${infos.fkUsuario});`;
    console.log(
      "Executando a instrução SQL para inserir ipv4 (1): \n" +
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
  } else if(infos.idIpv42 !== "" && infos.idIpv42 !== undefined){
    let instrucaoUpdateIpv4_2 = `UPDATE ipv4 SET numeroIP = '${infos.numeroIP2}', nomeLocal = '${infos.nomeLocal2}' WHERE idIpv4 = ${infos.idIpv42};`;
    console.log(
      "Executando a instrução SQL para atualizar ipv4 (2): \n" +
        instrucaoUpdateIpv4_2
    );
    await database.executar(instrucaoUpdateIpv4_2);
  } else{
    let instrucaoUpdateIpv4_2 = `INSERT INTO ipv4 (numeroIP, nomeLocal, fkMaquina, fkUsuario) VALUES ('${infos.numeroIP2}', '${infos.nomeLocal2}', ${idMaquina}, ${infos.fkUsuario});`;
    console.log(
      "Executando a instrução SQL para inserir ipv4 (2): \n" +
        instrucaoUpdateIpv4_2
    );
    await database.executar(instrucaoUpdateIpv4_2);
  }
};

function selecionarQualidade(fkEmpresa) {
    const query = `SELECT idMaquina, fkAlerta, MONTH(dataCaptura) as mes, COUNT(fkAlerta) AS qtdAlerta FROM maquina AS mac 
    JOIN componente ON idMaquina = fkMaquina 
        JOIN captura ON idComponente = fkComponente 
            JOIN registroalerta ON idCaptura = fkCaptura 
                WHERE fkEmpresa = ${fkEmpresa} 
                    GROUP BY idMaquina, fkAlerta, mes;`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

function selecionarPrejudicados(fkEmpresa) {
    const query = `SELECT idMaquina, componente, fkAlerta, MAX(DAY(dataCaptura)) dia FROM maquina AS mac 
	JOIN componente AS comp ON idMaquina = fkMaquina 
		JOIN captura ON idComponente = fkComponente 
			JOIN registroalerta ON idCaptura = fkCaptura 
				WHERE componente IN ('MemoriaRam', 'CPU', 'GPU', 'HDD') 
					AND fkAlerta > 1 AND fkEmpresa = ${fkEmpresa}
						GROUP BY idMaquina, componente, fkAlerta;`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

function selecionarQuantidade(fkEmpresa) {
    const query = `SELECT idMaquina, componente, fkAlerta, MAX(dataCaptura) maxCap FROM maquina AS mac
	JOIN componente AS comp ON idMaquina = fkMaquina
		JOIN captura ON idComponente = fkComponente
			JOIN registroalerta ON idCaptura = fkCaptura
				WHERE fkEmpresa = ${fkEmpresa}
                    AND componente IN ('MemoriaRam', 'CPU', 'GPU', 'HDD') 
						GROUP BY idMaquina, idComponente, fkAlerta
							ORDER BY idMaquina DESC`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

function listarComponentes(fkEmpresa) {
    const query = `SELECT componente, cap.unidadeMedida uni, COUNT(DAY(cap.dataCaptura)) dia FROM maquina mac
	RIGHT JOIN componente comp ON idMaquina = fkMaquina
		LEFT JOIN captura cap ON idComponente = fkComponente
            WHERE fkEmpresa = ${fkEmpresa}
		    	GROUP BY componente, uni;`;

    console.log("Executando a instrução SQL: \n");
    return database.executar(query);
}

function selecionarComponente(componente, fkEmpresa) {
    const query = `SELECT cap.dadoCaptura, cap.unidadeMedida, componente, MINUTE(dataCaptura) minuto FROM maquina mac
	JOIN componente comp ON idMaquina = fkMaquina
		JOIN captura cap ON idComponente = fkComponente
			WHERE fkEmpresa = ${fkEmpresa} AND componente = '${componente}'
				GROUP BY idMaquina, cap.dadoCaptura, cap.unidadeMedida, minuto
                    ORDER BY minuto;`;

    console.log(`Executando a instrução SQL: \n${query}`);
    return database.executar(query);
}

module.exports = {
    cadastrar,
    selecionarQualidade,
    selecionarPrejudicados,
    selecionarQuantidade,
    listarComponentes,
    selecionarComponente,
  listarMaquinas,
  buscarFuncionarios,
  salvarMaquina,
  deletarMaquina,
  editarMaquina,
};

