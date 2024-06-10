const memoriaRam = document.getElementById("chart_porcentagem_componentes");


// Dados para o gráfico
const labels = ['RAM', 'CPU', 'GPU', 'DISCO'];
const valores = gerarLista(4);

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


new Chart(memoriaRam, {
    type: 'bar',
    config: config,
    data: config.data,
    options: config.options,

});






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
    atualizaHistoricoDesempenho(index);
}




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


atualizaHistoricoDesempenho(0);

function atualizaHistoricoDesempenho(valor) {
    matarCanvasDesempenho();
    const historicoComponentes = document.getElementById("chart_historico_desempenho");

    var lista = gerarLista(3);

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

    var lista = [valor0, valor1, valor2]
    // var lista = gerarLista(4);
    //     lista[0] = valor0;
    //     lista[2] = valor1;
    //     lista[3] = valor2;

    for (var i = 0; i < lista.length; i++) {
        var canvas = document.getElementById("ulValorComponente" + i);
        canvas.innerHTML = lista[i] + "%";
    }

}


atualizaGraficoRelatorio(0);
function atualizaGraficoRelatorio(indexRelatorio) {
    matarCanvasRelatorio();

    var canvas = document.getElementById("chart_componente_relatorio");
    var componentes = ['RAM', 'CPU', 'GPU', 'DISCO'];
    var lista = gerarLista(20);


    var listaLabels = [];
    for(var i = 0; i <lista.length; i++){
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