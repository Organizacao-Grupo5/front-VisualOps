const queriesModel = require("../models/queriesModel");

async function listar (req, res) {

    const tabela = req.params.tabela;

    try {

        const resposta = await queriesModel.listar(tabela);

        if (resposta) {
            res.status(202).json(resposta);    
        
        } else {
            console.error(`Não foi possível listar os valoes da tabela '${tabela}'!`);
            
            res.status(400).send(`Não foi possível listar os valores da tabela '${tabela}'!`);
        }

    } catch (error) {
        console.error("Não foi possivel executar o comando de listar!", error);

        res.status(500).json(error);
    }

}

async function deletar (req, res) {

    const tabela = req.params.tabela;
    const campo = req.body.campo;
    const valor = req.body.valor;

    try {

        const resposta = await queriesModel.deletar(tabela, campo, valor);

        if (resposta) {
            res.status(202).json(resposta);    
        
        } else {
            console.error(`Não foi possível deletar o valor '${valor}' da tabela '${tabela}'!`);
            
            res.status(400).send(`Não foi possível deletar o valor '${valor}' da tabela '${tabela}'!`);
        }

    } catch (error) {
        console.error("Não foi possivel executar o comando de deletar!", error);

        res.status(500).json(error);
    }

}

module.exports = { listar, deletar };
