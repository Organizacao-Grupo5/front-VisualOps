function cadastrarEndereco() {

    fetch("/endereco/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cep: localStorage.getItem('CEP'),
            logradouro: localStorage.getItem('LOUGRADOURO'),
            numero: localStorage.getItem('NUMERO'),
            bairro: localStorage.getItem('BAIRRO'),
            estado: localStorage.getItem('ESTADO'),
            complemento: sessionStorage.getItem('COMPLEMENTO'),
            // fkEmpresa: sessionStorage.getItem('CNPJ')
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
