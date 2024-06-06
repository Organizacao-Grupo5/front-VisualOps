const maquinaModel = require("../models/maquinaModel");

function cadastrar(req, res) {
  const numeroIdentificacao = req.body.numeroIdentificacao;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const fkUsuario = req.body.fkUsuario;

  if (numeroIdentificacao == undefined) {
    res.status(400).send("O número de identificação está undefined!");
  } else if (marca == undefined) {
    res.status(400).send("Seu marca está undefined!");
  } else if (modelo == undefined) {
    res.status(400).send("Seu modelo está undefined!");
  } else if (fkUsuario == undefined) {
    res.status(400).send("A fkUsuario está undefined!");
  } else {
    maquinaModel
      .cadastrar(numeroIdentificacao, marca, modelo, fkUsuario)
      .then(function (resposta) {
        res.status(200).send("Cadastro criado com sucesso");
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

const buscarMaquinaPorEmpresa = async (req, res) => {
  const idEmpresa = req.params;
  await maquinaModel
    .listarMaquinas(idEmpresa)
    .then((resp) => {
      return res.json(resp);
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
};

const buscarFuncionarios = async (req, res) => {
  const busca = req.body.info;
  console.log("Dados recebidos na requisição:", busca);

  try {
    const resp = await maquinaModel.buscarFuncionarios(busca);
    console.log("Resposta da busca:", resp);

    if (resp.length > 0) {
      res.json(resp);
    } else {
      res.status(404).json({ message: "Nenhum funcionário encontrado" });
    }
  } catch (erro) {
    console.error("Erro ao buscar funcionários:", erro);
    res
      .status(500)
      .json({ message: erro.sqlMessage || "Erro interno do servidor" });
  }
};

const salvarMaquina = async (req, res) => {
  const infos = req.body.infos;
  console.log("Dados recebidos na requisição:", infos);

  try {
    await maquinaModel.salvarMaquina(infos);
    res.json({ message: "Máquina salva com sucesso" });
  } catch (erro) {
    console.error("Erro ao salvar a máquina:", erro);
    if (erro.message === "Senha inválida") {
      res.status(400).json({ message: "Senha inválida para o usuário logado" });
    } else {
      res
        .status(500)
        .json({ message: erro.message || "Erro interno do servidor" });
    }
  }
};

const deletarMaquina = async (req, res) => {
  const infos = req.body.info;
  const idMaquina = req.params.idMaquina;
  console.log("Dados recebidos na requisição:", infos, idMaquina);

  try {
    await maquinaModel.deletarMaquina(infos, idMaquina);
    res.json({ message: "Máquina deletada com sucesso" });
  } catch (erro) {
    console.error("Erro ao deletar a máquina:", erro);
    res
      .status(400)
      .json({ message: erro.message || "Erro ao deletar a máquina" });
  }
};

const editarMaquina = async (req, res) => {
  const infos = req.body.infos;
  const idMaquina = req.params.idMaquina;
  console.log("Dados recebidos na requisição:", infos, idMaquina);

  try {
    await maquinaModel.editarMaquina(infos, idMaquina);
    res.json({ message: "Máquina Editada com sucesso" });
  } catch (erro) {
    console.error("Erro ao editar a máquina:", erro);
    res
      .status(400)
      .json({ message: erro.message || "Erro ao editar a máquina" });
  }
};


function selecionarQualidade(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else {
        maquinaModel.selecionarQualidade(fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function selecionarPrejudicados(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else {
        maquinaModel.selecionarPrejudicados(fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function selecionarQuantidade(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else {
        maquinaModel.selecionarQuantidade(fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function listarComponentes(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else {
        maquinaModel.listarComponentes(fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function selecionarComponente(req, res) {

    const componente = req.params.componente;
    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else if (componente == undefined) {
        res.status(400).send("O componente está indefinido!");
    } else {
        maquinaModel.selecionarComponente(componente, fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function selecionarMaquinas(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("O foreign key da empresa está indefinido!");
    } else {
        maquinaModel.selecionarMaquinas(componente, fkEmpresa)
        .then(resposta => {

            if (resposta.length > 0) {
                res.json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
    }
}


module.exports = {
    cadastrar,
    selecionarQualidade,
    selecionarPrejudicados,
    selecionarQuantidade,
    listarComponentes,
    selecionarComponente,
selecionarMaquinas,
  buscarMaquinaPorEmpresa,
  buscarFuncionarios,
  salvarMaquina,
  deletarMaquina,
  editarMaquina,
};
