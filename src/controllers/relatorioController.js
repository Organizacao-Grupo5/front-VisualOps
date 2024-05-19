const relatorioModel = require('../models/relatorioModel');

function buscarComponentesElegiveis(req, res) {
    const idUsuario = req.params;
    const preferencias = req.body.dados;

    let dados = [];

    const gerarDados = (tipo) => {
        return relatorioModel.buscarQtdRelatorios(idUsuario, preferencias, tipo);
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

module.exports = {
    buscarComponentesElegiveis
};
