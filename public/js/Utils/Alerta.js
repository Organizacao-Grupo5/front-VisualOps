const background = document.getElementById("bg");
const pop = document.getElementById("pop");

const mensagem = {
    inicial: `OLÁ USUÁRIO, É UM PRAZER TÊ-LO CONOSCO, SUA DASHBOARD PESSOAL FOI PROJETADA SER TODA INTERATIVA, PORÊM AINDA ESTAMOS EM DESENVOLVIMENTO...<br><br>EM BREVE ESTARÁ DISPONÍVEL.`,
    charts: `FUNCIONALIDADE DESSA CHART AINDA NÂO DESENVOLVIDA.`,
    tela: `TELA DE REDIRECIONAMENTO AINDA EM DESENVOLVIMENTO.`
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

background.addEventListener("click", () => {
    aparecerPop();
});