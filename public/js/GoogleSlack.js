const janela = {
    carregar: cadastro(), 
    botao: redirecionamento(pagina),
}


function cadastro() {

    window.onload = async () => {

        console.log('NÂO ESTÁ ENTRANDO AQUI <======>')
        const slctPlano = document.getElementById('slctPlano');

        
        const listaPlanos = await selecionarPlano();

        for (let plano of Object.values(listaPlanos)) {
            
            if (plano) {
            
                console.log(plano);
                slctPlano.innerHTML += `<option value="${plano.nome}" itemid="${plano.idPlano}">${plano.nome}</option>`
            };

        }
        console.log('ACABOU O FOR.');
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
