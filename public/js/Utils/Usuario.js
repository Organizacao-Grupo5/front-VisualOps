async function cadastrarUsuario(CARGO) {

    try {
        
        const response = await fetch("/usuario/cadastrar", {
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
        });

        if (response.ok) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);
            
            mostrarMensagem(mensagem.criacao.usuario);
            
            if (
                CARGO == 'freelancer' ||
                CARGO == 'dono'
            ) {
                setTimeout(() => {
                    windowLogin();
                }, 1500);
            }

            return dados;
        } else {
            console.error("Erro ao criar o usuário.");
        
            mostrarMensagem(mensagem.criacao.fracasso);

            throw new Error("Erro ao executar a criação do usuário!");
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);
    
        throw error;
    }

    return false;
};
