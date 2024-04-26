const memoriaRam = document.getElementById("chart_porcenatagem_uso_memoria_ram");
const CPU = document.getElementById("chart_porcenatagem_uso_cpu");


const label = {
    memoriaRam: [''],
    cpu: ['']
}

const options = {
    scales: {
      xAxes: [{
        display: false, 
      }],
    },
    indexAxis: 'y',
    maintainAspectRatio: false,
  };

const dataset = {
    memoriaRam: [{
        label: 'none',
        data: [80],
        backgroundColor: [
            '#9450F2',
        ],
        hoverBackgroundColor: '#9455E2',
        borderRadius:5
    }],
    CPU: [{
        label: 'none',
        data: [33],
        backgroundColor: [
            '#9450F2',
        ],
        hoverBackgroundColor: '#9455E2',
        borderRadius:5
    }]
};

const datas = {
    toMemoriaRam: {
        labels: label.memoriaRam,
        datasets: dataset.memoriaRam
    },
    toCPU: {
        labels: label.CPU,
        datasets: dataset.CPU
    }
}

new Chart(memoriaRam, {
    type: 'bar',
    data: datas.toMemoriaRam,
    options: options,
    
});

new Chart(CPU, {
    type: 'bar',
    data: datas.toCPU,
    options: options,
    
});