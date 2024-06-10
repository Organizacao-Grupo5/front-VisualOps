carregarInfosMaquina();
async function carregarInfosMaquina() {

    var idUsuario = sessionStorage.getItem('idUsuario');

    fetch(`/dashboardAcessoConfiguracaoAlertaRoute/carregarInfosMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            idServer: idUsuario
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));


                    const resultadoRequerirDados = json.resultadoRequerirDados;

                    console.log(resultadoRequerirDados)

                     gerarMaquinas(resultadoRequerirDados)

                });

            } else {
                throw "Houve um erro ao tentar acessar os dados da Dashboard do usuário!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });


    return false;

}


 function gerarMaquinas(dadosRequeridos){

    let dadosMaquinas = dadosRequeridos;
    let containerMaquinas = document.getElementById("lista_maquinas");

    for(let i = 0; i < dadosMaquinas.length; i++){

    let maquinaDiv = document.createElement('div');
    maquinaDiv.className = 'card-maquina';

    maquinaDiv.innerHTML = `
                                <div class="infos-topo">
                                    <div class="ip-publico">IP Público: ${dadosMaquinas[i].ip_maquina}</div> 
                                    <button class="btn-acessar" onclick="configurarMaquina(${dadosMaquinas[i].id_maquina})">Acessar</button>
                                </div>
                                <div class=infos-meio>
                                    <div class="sistema">
                                        <div>Sistema</div>
                                        <div>
                                            <div>Disco Total: ${dadosMaquinas[i].dado_volume} ${dadosMaquinas[i].unidade_volume}</div>
                                        </div>
                                    </div>
                                    <div class="info-hardware">
                                        <div>Info. Hardware</div>
                                        <div>
                                            <div>Processador: ${dadosMaquinas[i].modelo_cpu}</div>
                                            <div>Placa de vídeo: ${dadosMaquinas[i].modelo_gpu1}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="infos-fundo">
                                    <div>Responsável: ${dadosMaquinas[i].nome_maquina}</div>
                                </div>
                            `

        containerMaquinas.appendChild(maquinaDiv);
    }

 }

 function configurarMaquina(maquina){
    sessionStorage.setItem('idMaquina', maquina);
    window.location.href = 'dashboardConfiguracaoAlerta.html';

 }