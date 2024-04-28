const janela = {
    carregar: cadastro(), 
    botao: redirecionamento(pagina),
}


function cadastro() { 
    window.onload = async () => {

        const slctPlano = document.getElementById('slctPlano');
        
        const listaPlanos = await selecionarPlano();

        for (let plano of Object.values(listaPlanos)) {
            
            if (plano) slctPlano.innerHTML += `<option value="${plano.nome}" data-id="${plano.idPlano}">${plano.nome}</option>`

        }
    };

} 

function redirecionamento(pagina) {

    window.onload = () => {
        
        document.getElementById("bt"+pagina).addEventListener("click", () => {
            pagina = pagina.toLowerCase();
            window.location.href = '/'+pagina+'/auth';
        });

    }
}
