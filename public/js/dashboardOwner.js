const first = document.getElementById("chart_1");
const second = document.getElementById("chart_2");
const third = document.getElementById("chart_horizontal"); 
const colunas = document.getElementsByClassName('colunas_status');

function geradorNumeros() {
    const random = Math.round(Math.random() * 50) + 1;

    return random;
}

function gerarLista(numero) {
    let list = [];

    for (let i = 0; i < numero; i++) {
        list.push(geradorNumeros());
    }

    return list;
}

const label = {
    first: ['Baixo', 'Médio', 'Alto'],
    second: ['CPU', 'GPU', 'RAM', 'HHD'],
    third: [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
}

const dataset = {
    first: [{
        label: 'Quantidade de Computadores por Desempenho Mensal',
        data: gerarLista(3),
        backgroundColor: [
            '#F2274C',
            '#F2AB27',
            '#449ADE'
        ],
        hoverOffset: 15
    }],
    second: [{
        label: 'Hardwares Prejudicados por Dia',
        data: gerarLista(4),
        backgroundColor: '#F2AB27',
        hoverBackgroundColor: '#F2274C',
        borderRadius: 5
    }],
    third: [{
        label: 'Usabilidade Diária por Equipe',
        data: gerarLista(30),
        backgroundColor: '#449ADE',
        borderColor: '#449ADE',
        hoverBackgroundColor: '#449ADE',
        tension: 0.2,
    }]
};

const datas = {
    toFirst: {
        labels: label.first,
        datasets: dataset.first,
    },
    toSecond: {
        labels: label.second,
        datasets: dataset.second
    },
    toThird: {
        labels: label.third,
        datasets: dataset.third
    }
}

new Chart(first, {
    type: 'pie',
    data: datas.toFirst,
    plugins: [ChartDataLabels],
    options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            y: {
                display: false,
                beginAtZero: true
            },
        },
        plugins: {
            datalabels: {
                color: 'white',
                anchor: 'center',
                align: 'start',
                offset: -90,
                font: {
                    size: 23,
                },
                formatter: function(value) {
                    return value + " PCs";
                }
            }
        },
        onHover: (event, chartElements) => {
            if (chartElements.length > 0) {
                event.native.target.style.cursor = 'pointer';
            } else {
                event.native.target.style.cursor = 'default'
            }
        },
        onClick: (event, context) => {
            const index = context[0].index;
            const labels = label.first[index];
            aparecerPop(mensagem.charts);
        }
    },
        
});

new Chart(second, {
    type: 'bar',
    data: datas.toSecond,
    options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {  
            x: {
                grid: {
                    display: false
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        onHover: (event, chartElements) => {
            if (chartElements.length > 0) {
                event.native.target.style.cursor = 'pointer';
            } else {
                event.native.target.style.cursor = 'default'
            }
        },
        onClick: (event) => {
            aparecerPop(mensagem.charts);
        }
    }
});

new Chart(third, {
    type: 'line',
    data: datas.toThird,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: function(context) {
                    if (
                        context.dataIndex == 0 ||
                        context.dataIndex == 23 ||
                        context.dataIndex == 29
                    ) {
                        return 5;
                    } else {
                        return 1;
                    }

                }
            },
        },
        plugins: {
            datalabels: {
                onHover: (event, chartElements) => {
                    if (chartElements.length > 0) {
                        event.native.target.style.cursor = 'pointer';
                    } else {
                        event.native.target.style.cursor = 'default'
                    }
                },
            }
        }
    }
});


window.onload = () => {
    aparecerPop(mensagem.inicial);
    mostrarKpi4();
    mostrarKpi5();
    totalGrafico1();
};

function mostrarKpi5() {

    const listaDiv = document.getElementsByClassName('relatorio');
    
    listaDiv[0].innerHTML = dataset.third[0].data[29];
    listaDiv[1].innerHTML = dataset.third[0].data[23];
    listaDiv[2].innerHTML = dataset.third[0].data[0];
}

function mostrarKpi4() {
    for (col in colunas) {
        for (pos in colunas[col].children) {
            colunas[col].children[pos].innerText = geradorNumeros(1);
        }
    }
}

function totalGrafico1() {
    const dados = dataset.first[0].data;

    let total = 0;

    for (let i = 0; i < dados.length; i++) {
        total += dados[i];
    }

    document.getElementById('qtdTotal').innerHTML = total;
}

function moverRight() {

    aparecerPop(mensagem.charts);
    
}    

function moverLeft() {

    aparecerPop(mensagem.charts);

}

