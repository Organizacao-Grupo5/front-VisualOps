async function cadastrarUsuario(CARGO) {

    try {
        
        const response = await fetch("/usuario/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: sessionStorage.getItem('NOME_USUARIO'),
                email: sessionStorage.getItem('EMAIL'),
                senha: sessionStorage.getItem('SENHA'),
                cargo: CARGO,
                fkEmpresa: sessionStorage.getItem('fkEmpresa') 
            }),
        });

        sessionStorage.removeItem('fkEmpresa')

        if (response.ok) {

            const dados = await response.json();
            console.log("RESPOSTA : ", response);
            
            mostrarMensagem(mensagem.criacao.sucesso);
            
            if (
                CARGO == 'freelancer' ||
                CARGO == 'dono'
            ) {
                setTimeout(() => {
                    windowLogin();
                }, 1500);
            }

            return response;
        } else {
            console.error("Erro ao criar o usuário.");
        
            mostrarMensagem(mensagem.criacao.fracasso);

            throw new Error("Erro ao executar a criação do usuário!");
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);
    
        throw error;
    }
};
