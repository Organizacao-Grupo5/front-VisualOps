const relatorioModel = require('../models/relatorioModel');

function buscarComponentesElegiveis(req, res) {
    const idUsuario = req.params;
    const preferencias = req.body.dados;

    const idEmpresa = req.body.idEmpresa;

    let dados = [];

    const gerarDados = (tipo) => {
        return relatorioModel.buscarQtdRelatorios(idUsuario, preferencias, tipo, idEmpresa);
    }

    if (preferencias.tipo.diario) {
        const promessaDiario = gerarDados("diario");
        if (promessaDiario) {
            dados.push(promessaDiario);
        }
    }
    if (preferencias.tipo.semanal) {
        const promessaSemanal = gerarDados("semanal");
        if (promessaSemanal) {
            dados.push(promessaSemanal);
        }
    }
    if (preferencias.tipo.mensal) {
        const promessaMensal = gerarDados("mensal");
        if (promessaMensal) {
            dados.push(promessaMensal);
        }   
    }

    if (dados.length === 0) {
        res.status(404).json("Nenhum dado encontrado com as preferências especificadas.");
        return;
    }

    Promise.all(dados)
        .then(respostas => {
            console.log("Respostas recebidas:", respostas);
            res.json(respostas);
        })
        .catch(erro => {
            console.error("Erro ao obter dados:", erro);
            res.status(500).json({ error: erro.message });
        });
}

const abrirRelatorio = (req, res) => {
    const dados = req.body.info;
    const idUser = req.params;

    relatorioModel.infoCapturasData(dados, idUser)
    .then(registros => {
      res.json(registros);
    })
    .catch(error => {
      res.status(500).json({ error: 'Erro ao abrir o relatório', details: error });
    });
}

module.exports = {
    buscarComponentesElegiveis,
    abrirRelatorio
};
