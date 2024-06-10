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
            console.log(mensagem.tela.cadastro.sucesso);

        } else {
            console.log(mensagem.tela.cadastro.fracasso);

            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });

    return false;
};

async function listarEnderecoByFk(fkEmpresa) {
    
    try {
        
        const resposta = await fetch(`/endereco/listar/${fkEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log("RESULTADO: ", dados);

            return dados;
        } else {
            console.error("Houve um erro ao listar o endereço!");
            
            throw new Error("Houve um erro ao listar o endereço!")
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);

        return false;
    };

}
