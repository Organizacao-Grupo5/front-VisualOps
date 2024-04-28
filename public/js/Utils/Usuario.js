function cadastrarUsuario() {

    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: localStorage.getItem('NOME_USUARIO'),
            email: localStorage.getItem('EMAIL'),
            senha: localStorage.getItem('SENHA'),
            cargo: CARGO
        }),
    }).then(resposta => {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            const mensagem = "Cadastro realizado com sucesso!" 
            mostrarMensagem(mensagem);

            setTimeout(() => {
                window.location = "login.html";
            }, 1500);
        } else {
            const mensagem = "Não foi possivel realizar o seu cadastro, por favor tente novamente!" 
            mostrarMensagem(mensagem);
            
            throw "Houve um erro ao tentar realizar o cadastro!"
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });

    return false;
};
