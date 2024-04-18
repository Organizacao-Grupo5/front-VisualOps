const first = document.getElementById("chart_1");


const label = {
    first: ['Baixo', 'Médio', 'Alto'],
}

const dataset = {
    first: [{
        label: 'Desempenho dos computadores semanalmente.',
        data: [75, 29, 103],
        backgroundColor: [
            '#F2274C',
            '#F2AB27',
            '#9450F2'
        ],
        hoverOffset: 15
    }]
};

const datas = {
    toFirst: {
        labels: label.first,
        datasets: dataset.first,
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
            }
        }
    }
})