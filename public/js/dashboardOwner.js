const first = document.getElementById("chart_1");
const second = document.getElementById("chart_2");
const third = document.getElementById("chart_horizontal");

const label = {
    first: ['Baixo', 'Médio', 'Alto'],
    second: ['CPU', 'GPU', 'RAM', 'HHD'],
    third: ['Mês', 'Semana', 'Dia'],
}

const dataset = {
    first: [{
        label: 'Desempenho dos computadores diariamente',
        data: [75, 29, 103],
        backgroundColor: [
            '#F2274C',
            '#F2AB27',
            '#9450F2'
        ],
        hoverOffset: 15
    }],
    second: [{
        label: 'Hardwares Prejudicados por Dia',
        data: [30, 25, 33, 28],
        backgroundColor: '#F2AB27',
        hoverBackgroundColor: '#F2274C',
        borderRadius: 5
    }],
    third: [{
        label: 'Hístorico Componente',
        data: [37, 43, 30],
        backgroundColor: [
            '#9450F2',
            '#9450F2',
            '#9450F2',
        ],
        hoverBackgroundColor: '#9455E2',
        borderRadius:5
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
            alert("clicou valor " + labels);
        }
    },
        
});

new Chart(second, {
    type: 'bar',
    data: datas.toSecond,
    options: {
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
            alert("clicou");
        }
    }
});

new Chart(third, {
    type: 'bar',
    data: datas.toThird,
    options: {
        indexAxis: 'y',
    }
});
