function cadastrarEndereco() {

    fetch("/endereco/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cep: sessionStorage.getItem('CEP'),
            logradouro: sessionStorage.getItem('LOUGRADOURO'),
            numero: sessionStorage.getItem('NUMERO'),
            bairro: sessionStorage.getItem('BAIRRO') ?? '',
            estado: sessionStorage.getItem('ESTADO') ?? '',
            complemento: sessionStorage.getItem('COMPLEMENTO'),
            fkEmpresa: sessionStorage.getItem('fkEmpresa')
        }),
    }).then(resposta => {
        sessionStorage.removeItem('CEP');
        sessionStorage.removeItem('LOUGRADOURO');
        sessionStorage.removeItem('NUMERO');
        sessionStorage.removeItem('BAIRRO');
        sessionStorage.removeItem('ESTADO');
        sessionStorage.removeItem('COMPLEMENTO');

        console.log('SessionStorage Endereço Limpo!');

        if (resposta.ok) {
            console.log(mensagem.criacao.sucesso);

        } else {
            console.log(mensagem.criacao.fracasso);

            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });

    return false;
};
