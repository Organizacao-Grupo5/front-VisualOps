


carregarInfosMaquina();
async function carregarInfosMaquina() {

var idUsuario = sessionStorage.getItem('idUsuario');
var idMaquina = sessionStorage.getItem('idMaquina');

    fetch(`/dashboardConfiguracaoAlertaRoute/carregarInfosMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            idServer: idUsuario,
            idMaqui: idMaquina
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

                    carregarDadosMeio(resultadoRequerirDados);

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

function carregarDadosMeio(dadosRequeridos){

        let dados = dadosRequeridos;
        console.log(dadosRequeridos[0])

        let ipMaquina = document.getElementById("ip_maquina");
        let processador = document.getElementById("processador_maquina");
        let placaVideo = document.getElementById("placa_de_video");
        let disco = document.getElementById("disco_maquina");
        let responsavel = document.getElementById("nome_responsavel");

        ipMaquina.innerHTML = `IP Máquina: ${dadosRequeridos[0].ip_maquina}`;
        processador.innerHTML = `Processador: ${dadosRequeridos[0].modelo_cpu}`;
        placaVideo.innerHTML = `Placa de vídeo: ${dadosRequeridos[0].modelo_gpu1}`;
        disco.innerHTML = `Disco: ${dadosRequeridos[0].dado_volume} ${dadosRequeridos[0].unidade_volume}`;
        responsavel.innerHTML = `Nome Responsável: ${dadosRequeridos[0].nome_maquina}`;
    
}





















carregarInfosComponente();
async function carregarInfosComponente() {

    var idUsuario = sessionStorage.getItem('idUsuario');
    var idMaquina = sessionStorage.getItem('idMaquina');
    
        fetch(`/dashboardConfiguracaoAlertaRoute/carregarInfosComponente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({
                idServer: idUsuario,
                idMaqui: idMaquina
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
    
                        carregarComponentes(resultadoRequerirDados);
    
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

    let dadoSelecionadoInput = '';
    function carregarComponentes(dadosRequeridos){
        let containerComponentes = document.getElementById("container_esolher_componentes");
        let componenteContainer = document.createElement("div");
        componenteContainer.className = 'container-componentes';
    
        console.log(dadosRequeridos);

        // Percorre os dados recebidos
        for(let i = 0; i < dadosRequeridos.length - 1; i++){
            let componenteGerado = document.createElement("button");
            switch (dadosRequeridos[i].componente) {
                case 'CPU':
                    componenteGerado.innerHTML = "CPU";
                    break;
                case 'HDD':
                    componenteGerado.innerHTML = "HDD";
                    break;
                case 'GPU':
                    componenteGerado.innerHTML = "GPU";
                    break;
                case 'MemoriaRam':
                    componenteGerado.innerHTML = "Memória RAM";
                    break;
                case 'Bateria':
                    componenteGerado.innerHTML = "Bateria";
                    break;
                default:
                    break;
            }

            componenteGerado.onclick = function() {
                let botoes = document.querySelectorAll('.container-componentes button');
                botoes.forEach(b => b.classList.remove('selecionado'));

                componenteGerado.classList.add('selecionado');
    
                dadoSelecionadoInput = dadosRequeridos[i].idComponente;

                carregaridComponente(dadoSelecionadoInput)

                console.log(dadoSelecionadoInput);
            };

            componenteContainer.appendChild(componenteGerado);
        }
        containerComponentes.appendChild(componenteContainer);
    }



    function niveisAlerta(){

        let inputAlerta = document.getElementById("valor_alerta_critico");

        let adequadoTransparente = document.getElementById("adequado_transparente");
        let baixoTransparente = document.getElementById("baixo_transparente");
        let moderadoTransparente = document.getElementById("moderado_transparente");
        let altoTransparente = document.getElementById("alto_transparente");
        let criticoTransparente = document.getElementById("critico_transparente");
        
        adequadoTransparente.innerHTML = `${Math.round(inputAlerta.value / 10 * 100) / 100}`;
        baixoTransparente.innerHTML = `${Math.round(inputAlerta.value * 3 / 10 * 100) / 100}`;
        moderadoTransparente.innerHTML = `${Math.round(inputAlerta.value * 5 / 10 * 100) / 100}`;
        altoTransparente.innerHTML = `${Math.round(inputAlerta.value * 7 / 10 * 100) / 100}`;
        criticoTransparente.innerHTML = `${Math.round(inputAlerta.value * 9 / 10 * 100) / 100}`;


    }













    let idComponente;
    let fkComponente;
    let fkMaquina;

    async function carregaridComponente(nomeComponente) {

        var componente = nomeComponente;
        var idMaquina = sessionStorage.getItem('idMaquina');

            fetch(`/dashboardConfiguracaoAlertaRoute/carregaridComponente`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    idComponente: componente,
                    idMaqui: idMaquina
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);
        
                    if (resposta.ok) {
        
                        resposta.json().then(json => {
                            console.log(json);
                            console.log(JSON.stringify(json));
        
        
                            const resultadoRequerirDados = json.resultadoRequerirDados;
        
                            idComponente = resultadoRequerirDados[0].idComponente;
                            fkComponente = resultadoRequerirDados[0].fkComponente;
                            fkMaquina = resultadoRequerirDados[0].fkMaquina;

                            document.getElementById("valor_alerta_critico").value = resultadoRequerirDados[0].minimoParaSerMedio * 2;
                            niveisAlerta();
                            console.log(resultadoRequerirDados)
        
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




    async function salvarAlertaCritico() {

        var idMaquina = sessionStorage.getItem('idMaquina');
        let valorInput = document.getElementById("valor_alerta_critico").value;
        
            fetch(`/dashboardConfiguracaoAlertaRoute/salvarAlertaCritico`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    idMaqui: idMaquina,
                    idDoComponente: idComponente,
                    fkDoComponente: fkComponente,
                    fkDaMaquina: fkMaquina,
                    idValor: valorInput
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




        