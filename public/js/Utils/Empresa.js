function cadastrarEmpresa(NOME_FANTASIA, CNPJ, PLANO) {

    fetch("/empresa/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: NOME_FANTASIA,
            cnpj: CNPJ,
            fkPlano: PLANO
        }),
    }).then(resposta => {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            const mensagem = "Cadastro realizado com sucesso!";
            mostrarMensagem(mensagem);

        } else {
            const mensagem = "Não foi possivel cadastrar a empresa, por favor tente novamente!";
            mostrarMensagem(mensagem);

            throw "Houve um erro ao tentar realizar o cadastro!"
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });

    return false;
};
