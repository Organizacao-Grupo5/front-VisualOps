function cadastrarUsuario(){
    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            
        }),
    }).then(resposta => {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            mostrarMensagem("Cadastro realizado com sucesso!");

            setTimeout(() => {
                window.location = "login.html";
            }, "1500");
        } else {
            mostrarMensagem("Não foi possivel realizar o seu cadastro, por favor tente novamente!");
            throw "Houve um erro ao tentar realizar o cadastro!"
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });
    return false;
}

module.exports = { cadastrarUsuario};