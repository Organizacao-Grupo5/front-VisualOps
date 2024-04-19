const first = document.getElementById("chart_1");
const second = document.getElementById("chart_2");

const label = {
    first: ['Baixo', 'Médio', 'Alto'],
    second: ['CPU', 'GPU', 'RAM', 'HHD'],
}

const dataset = {
    first: [{
        label: 'Desempenho dos computadores diariamente.',
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
};

const datas = {
    toFirst: {
        labels: label.first,
        datasets: dataset.first,
    },
    toSecond: {
        labels: label.second,
        datasets: dataset.second
    }
}

new Chart(first, {
    type: 'pie',
    data: datas.toFirst,
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                display: false,
                beginAtZero: true
            },
        },
        tooltips: {
            enabled: false
        },
        pieceLabel: {
            mode: 'value'
        },
        responsive: true,
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Idades',
            fontSize: 20
        },
    }
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
        onClick: (event) => {
            alert("clicou");
        }
    }
});
