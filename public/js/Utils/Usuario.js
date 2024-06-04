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
            
            mostrarMensagem(mensagem.tela.sucesso.cadastro);
            
            if (
                CARGO == 'freelancer' ||
                CARGO == 'dono'
            ) {
                setTimeout(() => {
                    entrarPerfil();
                }, 1500);
            }

            return response;
        } else {
            console.error("Erro ao criar o usuário.");
        
            mostrarMensagem(mensagem.tela.fracasso.cadastro);

            throw new Error("Erro ao executar a criação do usuário!");
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);
    
        throw error;
    }
};

async function autenticar(email, senha) {

    try {
        
        const resposta = await fetch('/usuario/autenticar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailJSON: email,
                senhaJSON: senha
            })
        });

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log("Tudo certo com a requisição: ", resposta);

            sessionStorage.setItem("idUsuario", dados.id);
            sessionStorage.setItem("emailUsuario", dados.email);
            sessionStorage.setItem("nomeUsuario", dados.nome);
            sessionStorage.setItem("nomeEmpresa", dados.nomeEmpresa);
            sessionStorage.setItem("fkEmpresa", dados.fkEmpresa);
            sessionStorage.setItem("caminhoIMG", dados.imagemPerfil);

            mostrarMensagem(mensagem.tela.sucesso.login(dados.nome));

            try {
                const response = await fetch('/firebase/listar-imagens', {
                  method: 'GET'
                });
        
                if (!response.ok) {
                  throw new Error('Erro ao listar as imagens');
                }
        
              } catch (error) {
                console.error(error);
              }

            setTimeout(() => {
                entrarPerfil();
            }, 2000);

            return true;

        } else {
            console.error("Houve um erro ao realizar o login!");

            mostrarMensagem(mensagem.tela.fracasso.login);
        
            throw new Error("Houve um erro ao autenticar o login!")
        }
        
    } catch (error) {
        console.log("Erro desconhecido na API ", error);
        
        return false;
    };

}

async function listar(tabela, campo, valor, alvo, join) {
    
    try {
        
        const resposta = await fetch(`/listar/${tabela}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                campo: campo,
                valor: valor,
                alvo: alvo,
                join: join
            })
        });

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log("RESULTADO: ", dados);

            return dados[0];
        } else {
            console.error("Houve um erro ao listar os usuários!");
            
            throw new Error("Houve um erro ao listar os usuários!")
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);

        return false;
    };

}

async function deletar(tabela, campo, valor) {

    try {
        
        const resposta = await fetch(`/deletar/${tabela}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                campo: campo,
                valor: valor
            })
        });

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log("RESULTADO: ", dados);
        } else {
            console.error(`Houve um erro ao deletar o valor '${valor}'!`);

            throw new Error(`Houve um erro ao deletar o valor '${valor}'!`)
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);

        return false;
    }; 

}
