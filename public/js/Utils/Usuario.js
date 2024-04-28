async function cadastrarUsuario(CARGO) {

    try {
        
        const response = await fetch("/usuario/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: localStorage.getItem(NOME_USUARIO),
                email: localStorage.getItem(EMAIL),
                senha: localStorage.getItem(SENHA),
                cargo: CARGO
            }),
        });

        if (response.ok) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);

            if (CARGO != 'freelancer')

            mostrarMensagem(mensagem.criacao.usuario);

            setTimeout(() => {
                window.location = "login.html";
            }, 1500);

            return dados;
        } else {
            console.error("Erro ao selecionar os planos.");
        
            const mensagem = "Não foi possivel realizar o seu cadastro, por favor tente novamente!" 
            mostrarMensagem(mensagem);

            throw new Error("Erro ao selecionar os planos!");
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);
    
        throw error;
    }

    return false;
};
