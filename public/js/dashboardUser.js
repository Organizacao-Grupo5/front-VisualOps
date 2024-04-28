// const memoriaRam = document.getElementById("chart_porcentagem_uso_memoria_ram");
// const CPU = document.getElementById("chart_porcentagem_uso_cpu");


// const label = {
//     memoriaRam: [''],
//     cpu: ['']
// }

// const options = {
//     scales: {
//         xAxes: [{
//             display: false,
//         }],
//     },
//     indexAxis: 'y',
//     maintainAspectRatio: false,
//     scales: {
//         x: {
//             min: 0,
//             max: 100,
//             ticks: {
//                 stepSize: 10,
//             },
//         },
//     },
//     legend: {
//             display: false,
//     },
// };

// const dataset = {
//     memoriaRam: [{
//         label: 'none',
//         data: [80],
//         backgroundColor: [
//             '#9450F2',
//         ],
//         hoverBackgroundColor: '#9455E2',
//         borderRadius: 5
//     }],
//     CPU: [{
//         label: 'ABC',
//         data: [50],
//         backgroundColor: [
//             '#9450F2',
//         ],
//         hoverBackgroundColor: '#9455E2',
//         borderRadius: 5
//     }]
// };

// const datas = {
//     toMemoriaRam: {
//         labels: label.memoriaRam,
//         datasets: dataset.memoriaRam
//     },
//     toCPU: {
//         labels: label.CPU,
//         datasets: dataset.CPU
//     }
// }

// new Chart(memoriaRam, {
//     type: 'bar',
//     data: datas.toMemoriaRam,
//     options: options,

// });

// new Chart(CPU, {
//     type: 'bar',
//     data: datas.toCPU,
//     options: options,

// });



const memoriaRam = document.getElementById("chart_porcentagem_componentes");


// Dados para o gráfico
const labels = ['RAM', 'CPU', 'GPU', 'DISCO'];
const valores = [51, 20, 9, 60];

// Configuração do gráfico
const config = {
    type: 'horizontalBar',
    data: {
        labels: labels,
        datasets: [{
            data: valores,
            backgroundColor: ['rgba(75, 192, 192, 0.6)', '#f0f', '#000', '#f00'],
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
    var componentes = ['RAM', 'CPU', 'CPU', 'DISCO'];
    if (valor < 0) {
        index--;
        if (index < 0) {
            index = 4;
        }
    } else {
        index++;
        if (index > 3) {
            index = 0;
        }
    }
    switch (index) {

        case 0:
            break;

        case 1:
            break;

        case 2:
            break;

        case 3:
            break;

    }
}

function atualizaHistoricoDesempenho(index) {

    const historicoComponentes = document.getElementById("chart_historico_desempenho");


    // Dados para o gráfico
    const labels = ['RAM', 'CPU', 'GPU', 'DISCO'];
    const valores = [51, 20, 9, 60];

    // Configuração do gráfico
    const config = {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: ['rgba(75, 192, 192, 0.6)', '#f0f', '#000', '#f00'],
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

}