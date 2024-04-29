const mensagem = {
    inicial: `OLÁ USUÁRIO, É UM PRAZER TÊ-LO CONOSCO, SUA DASHBOARD PESSOAL FOI PROJETADA SER TODA INTERATIVA, PORÊM AINDA ESTAMOS EM DESENVOLVIMENTO...<br><br>EM BREVE ESTARÁ DISPONÍVEL.`,
    charts: `FUNCIONALIDADE DESSA CHART AINDA NÂO DESENVOLVIDA.`,
    tela: {
        desenvolvimento: `TELA DE REDIRECIONAMENTO AINDA EM DESENVOLVIMENTO.`,
        sucesso: {
            cadastro: `Parabéns, Criação realizada com sucesso!`,
            login: (nome) => `Perfeito ${nome}, Login autenticado com sucesso!`
        },
        fracasso: {
            cadastro: `Não foi possivel realizar o cadastro, por favor verifique os campos e tente novamente!`,
            login: `Falha ao autenticar usuário, por favor verifique os campos!`
        }
    }
}

function aparecerPop(mensagem) {
    if (
        background.style.display == 'none' || 
        background.style.display == ''
    ) {
     
        background.style.display = 'flex';
        pop.innerHTML = mensagem;
        pop.style.display = 'block';
    
    } else {

        background.style.display = 'none';
        pop.style.display = 'none';

    }
}

function mostrarMensagem(newMensagem) {
    const divMsg = document.querySelector(".div-mensagem");
    divMsg.style.display = 'block';

    let mensagem = idMensagem;

    mensagem.innerHTML = newMensagem;
    
    setTimeout(() => {
        divMsg.style.display = 'none';
    }, 3000)
}
