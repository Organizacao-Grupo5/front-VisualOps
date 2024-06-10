function geradorNumeros() {
    const random = Math.round(Math.random() * 81) + 19;

    return random;
}


function gerarLista(numero) {
    let list = [];

    for (let i = 0; i < numero; i++) {
        list.push(geradorNumeros());
    }

    return list;
}











porcentagemUso();
async function porcentagemUso() {

    var idUsuario = sessionStorage.getItem('idUsuario');

    fetch(`/dashboardUserRoute/porcentagemUso`, {
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

                    const componentes = {};


                    for (const dado of resultadoRequerirDados) {
                        const componente = dado.componente;
                        if (!componentes[componente]) {
                            componentes[componente] = [];

                        }
                        componentes[componente].push(dado);
                    }


                    for (const componente in componentes) {
                        console.log(`Dados de ${componente}:`, componentes[componente]);
                    }

                    gerarGraficoPorcentagemComponentes(componentes);

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


function gerarGraficoPorcentagemComponentes(componentesFetch) {

    componentes = componentesFetch

    const porcentagemDeUso = document.getElementById("chart_porcentagem_componentes");

    // Dados para o gráfico
    let labels = [];
    let valores = [];

    const valoresProvisorios = [];
    for (const componente in componentes) {
        labels.push(componente);

        const dadoCaptura = componentes[componente];
        valoresProvisorios.push(dadoCaptura);
    }
    for (const arrayInterno of valoresProvisorios) {
        console.log(arrayInterno[arrayInterno.length - 1].dadoCaptura);
        valores.push(arrayInterno[arrayInterno.length - 1].dadoCaptura);
    }


    let memoriaRamTotal = Math.ceil(valores[3] / 4) * 4;
    valores[3] = Math.round(valores[3] / memoriaRamTotal * 100);

    const HDD = labels.indexOf("HDD");
    const RAM = labels.indexOf("MemoriaRam");

    labels[RAM] = "RAM";
    valores[RAM] = valores[RAM];
    labels.splice(HDD, 1);
    valores[valores.length - 1] = valores[valores.length - 1] / valores[HDD] * 100;
    valores.splice(HDD, 1);

    console.log(labels, valores)

    console.log(valores)

    // Configuração do gráfico
    const config = {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: ["#449ADE"],
            }],
        },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10,
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    };


    new Chart(porcentagemDeUso, {
        type: 'bar',
        config: config,
        data: config.data,
        options: config.options,

    });

}































var index = 0;

function mudarHistoricoDesempenho(valor) {
    if (valor < 0) {
        index--;
        if (index < 0) {
            index = 3;
        }
    } else {
        index++;
        if (index > 3) {
            index = 0;
        }
    }
    historicoDesempenho(index);
}


historicoDesempenho(index)

async function historicoDesempenho(index) {

    var idUsuario = sessionStorage.getItem('idUsuario');

    fetch("/dashboardUserRoute/historicoDesempenho", {
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
                    


                    let RAM = [];
                    let CPU = [];
                    let DISCO = [];
                    let GPU = []
                    let Volume = [];

                    let DiscoPorcentagem = [];

                    for (let i = 0; i < resultadoRequerirDados.length; i++) {

                        switch (resultadoRequerirDados[i].componente) {
                            case "MemoriaRam": RAM.push(resultadoRequerirDados[i]);
                                break;
                            case "CPU": CPU.push(resultadoRequerirDados[i]);
                                break;
                            case "GPU": GPU.push(resultadoRequerirDados[i]);
                                break;
                            case "HDD": DISCO.push(resultadoRequerirDados[i]);
                                break;
                            default : Volume.push(resultadoRequerirDados[i])
                        }
                    }

                    console.log(RAM[0].componente)

                    DiscoPorcentagem = [{
                        periodo: "Hoje",
                        componente: "DiscoPorcentagem",
                        media: Volume[0].media / DISCO[0].media * 100
                    }]
                   
                    var componentesMap = {
                        'RAM': RAM,
                        'CPU': CPU,
                        'GPU': GPU,
                        'DiscoPorcentagem': DiscoPorcentagem
                    };

                    var componentes = ['RAM', 'CPU', 'GPU', 'DiscoPorcentagem']
                    componenteAgora = componentes[index];

                    console.log(componentesMap[componenteAgora][0].media);

                    if(componentesMap[componenteAgora] == RAM){

                        let memoriaRamTotal = Math.ceil(componentesMap[componenteAgora][0].media / 4) * 4;
                        componentesMap[componenteAgora][0].media = componentesMap[componenteAgora][0].media / memoriaRamTotal * 100;

                    }


                    atualizaHistoricoDesempenho(index, componentesMap[componenteAgora]);
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










function atualizaHistoricoDesempenho(valor, dadoRequirido) {
    matarCanvasDesempenho();

    componente = dadoRequirido;

    

    const historicoComponentes = document.getElementById("chart_historico_desempenho");

    var lista = [];

    for(let i = 0; i < componente.length; i++){
        if(componente.length < 1){
            lista.push(0);            
        } 
        if(componente.length < 2){
            lista.push(0);            
        } 
        if(componente.length < 3){
            lista.push(0);
        }
        lista.push(componente[i].media);
        console.log(lista)
    }

    var componentes = ['RAM', 'CPU', 'GPU', 'DISCO'];

    const label = {
        historicoComponentes: ['30 dias', '7 dias', 'Atual'],
    }

    const dataset = {
        historicoComponentes: [{
            label: ('Uso - ' + componentes[valor]),
            data: lista,
            backgroundColor: '#449ADE',
            borderColor: '#449ADE',
            hoverBackgroundColor: '#449ADE',
            tension: 0.2,
        }]
    };

    const datas = {
        toHistoricoComponentes: {
            labels: label.historicoComponentes,
            datasets: dataset.historicoComponentes
        }
    }

    new Chart(historicoComponentes, {
        type: 'line',
        data: datas.toHistoricoComponentes,
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
    atualizaDadosComponente(lista[2], lista[1], lista[0]);
}

function matarCanvasDesempenho() {
    var canvas = document.getElementById("chart_historico_desempenho");
    canvas.parentNode.removeChild(canvas);
    var novoCanvas = document.createElement("canvas");
    novoCanvas.id = "chart_historico_desempenho";
    document.querySelector(".chart-historico-desempenho > div").appendChild(novoCanvas);
}

function atualizaDadosComponente(valor0, valor1, valor2) {

    var componentes = ['RAM', 'CPU', 'GPU', 'DISCO'];
    var nomeComponente = document.getElementById("nomeComponente");
    nomeComponente.innerHTML = componentes[index];

    var lista = [parseInt(valor0 * 100) / 100, parseInt(valor1 * 100) / 100, parseInt(valor2 * 100) / 100]

    for (var i = 0; i < lista.length; i++) {
        var canvas = document.getElementById("ulValorComponente" + i);
        canvas.innerHTML = lista[i] + "%";
    }

}














































desempenho(0)
async function desempenho(index) {

    var idUsuario = sessionStorage.getItem('idUsuario');

    fetch("/dashboardUserRoute/desempenho", {
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

                    let RAM = [];
                    let CPU = [];
                    let DISCO = [];
                    let GPU = []
                    let Volume = [];

                    let DiscoPorcentagem = [];

                    for (let i = 0; i < resultadoRequerirDados.length; i++) {

                        switch (resultadoRequerirDados[i].componente) {
                            case "MemoriaRam": RAM.push(resultadoRequerirDados[i].dadoCaptura);
                                break;
                            case "CPU": CPU.push(resultadoRequerirDados[i].dadoCaptura);
                                break;
                            case "GPU": GPU.push(resultadoRequerirDados[i].dadoCaptura);
                                break;
                            case "HDD": DISCO.push(resultadoRequerirDados[i]);
                                break;
                            default : Volume.push(resultadoRequerirDados[i])
                        }
                    }

                    for(let i = 0; i < GPU.length; i++){
                        if(GPU.length > 20){
                            GPU.shift();
                        }
                    }

                    for(let i = 0; i < DISCO.length; i++){
                        DiscoPorcentagem.push(Volume[i].dadoCaptura / DISCO[i].dadoCaptura * 100)
                    }


                    console.log(DiscoPorcentagem)

                    var componentesMap = {
                        'RAM': RAM,
                        'CPU': CPU,
                        'GPU': GPU,
                        'DiscoPorcentagem': DiscoPorcentagem
                    };

                    var componentes = ['RAM', 'CPU', 'GPU', 'DiscoPorcentagem']
                        componenteAgora = componentes[index];

                    if(componentesMap[componenteAgora] == RAM){

                        let memoriaRamTotal = Math.ceil(componentesMap[componenteAgora][0] / 4) * 4;

                       for(let i = 0; i < componentesMap[componenteAgora].length; i++){
                           console.log(componentesMap[componenteAgora][i])
                            componentesMap[componenteAgora][i] = Math.round(componentesMap[componenteAgora][i] / memoriaRamTotal * 100);
                       }
                    }

                    console.log(componentesMap[componenteAgora]);

                    atualizaGraficoRelatorio(index, componentesMap[componenteAgora])

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

function atualizaGraficoRelatorio(indexRelatorio, dadosRequeridos) {
    matarCanvasRelatorio();

    var canvas = document.getElementById("chart_componente_relatorio");
    var componentes = ['RAM', 'CPU', 'GPU', 'DISCO'];
    var lista = [];


    console.log(dadosRequeridos.length);
    for (let i = 0; i < dadosRequeridos.length; i++) {
        lista.push(dadosRequeridos);
    }

    while(lista.length < 20){
        lista.push(0)
    }


    var listaLabels = [];
    for (var i = 0; i < lista.length; i++) {
        listaLabels.push('');
    }


    const label = {
        canvas: listaLabels,
    }

    const dataset = {
        canvas: [{
            label: ('Uso - ' + componentes[indexRelatorio]),
            data: lista,
            backgroundColor: '#449ADE',
            borderColor: '#449ADE',
            hoverBackgroundColor: '#449ADE',
            tension: 0.2,
        }]
    };

    const datas = {
        toCanvas: {
            datasets: dataset.canvas,
            labels: label.canvas,
        }
    }

    new Chart(canvas, {
        type: 'line',
        data: datas.toCanvas,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10,
                    },
                },
            },
        }
    });
}

function matarCanvasRelatorio() {
    var canvas = document.getElementById("chart_componente_relatorio");
    canvas.parentNode.removeChild(canvas);
    var novoCanvas = document.createElement("canvas");
    novoCanvas.id = "chart_componente_relatorio";
    document.querySelector(".chart-componente-relatorio > div").appendChild(novoCanvas);
}



