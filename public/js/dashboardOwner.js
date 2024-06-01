const first = document.getElementById("chart_1");
const second = document.getElementById("chart_2");
const third = document.getElementById("chart_horizontal"); 
const colunas = document.getElementsByClassName('colunas_status');
const background = document.getElementById("bg");
const pop = document.getElementById("pop");

window.onload = () => {
    gerarDados();
//     aparecerPop(mensagem.inicial);
//     mostrarKpi4();
//     mostrarKpi5();
//     totalGrafico1();
};

async function gerarDados() {
    const fkEmpresa = sessionStorage.getItem("fkEmpresa");
    
    let dados;

    dados = await atualizarGrafico_1(fkEmpresa);
    gerenciarGrafico_1(dados);
    
    dados = await atualizarGrafico_2(fkEmpresa);
    gerenciarGrafico_2(dados);
    
    // dados = await atualizarGrafico_1(fkEmpresa);
    // gerenciarGrafico_1(dados);

    setInterval(async () => {
        dados = await atualizarGrafico_1(fkEmpresa);
        gerenciarGrafico_1(dados);
    }, 1800000)
}

async function atualizarGrafico_1(fkEmpresa) {
    try {
        const resposta = await fetch(`/maquina/selecionar/qualidade/${fkEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log("RESULTADO: ", dados);

            return dados;
        } else {
            console.error("Houve um erro ao selecionar maquinas por qualidade!");
            
            throw new Error("Houve um erro ao selecionar maquinas por qualidade!")
        }
    } catch (error) {
        console.log("Erro desconhecido na API ", error);
        return false;
    };
}

async function atualizarGrafico_2(fkEmpresa) {
    try {
        const resposta = await fetch(`/maquina/selecionar/prejudicado/${fkEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log("RESULTADO: ", dados);

            return dados;
        } else {
            console.error("Houve um erro ao selecionar maquinas por qualidade!");
            
            throw new Error("Houve um erro ao selecionar maquinas por qualidade!")
        }
    } catch (error) {
        console.log("Erro desconhecido na API ", error);
        return false;
    };
}

const list = {
    first: [0, 0, 0],
    second: [0, 0, 0, 0],
    third: [],
}

const label = {
    first: ['Alto', 'Médio', 'Baixo'],
    second: ['CPU', 'GPU', 'RAM', 'HDD'],
    third: [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
}

function gerenciarGrafico_1(dados) {
    // let mesAtual = 0;
    let idMaquinaAtual = 0;
    let maiorAlerta;
    let idAlerta;

    dados.forEach(consulta => {
        // if (consulta.mes >= mesAtual) mesAtual = consulta.mes
        if (
            idMaquinaAtual < consulta.idMaquina
        ) {
            if (idMaquinaAtual != 0) list.first[idAlerta-1]++;
            idMaquinaAtual = consulta.idMaquina;
            maiorAlerta = 0;
            idAlerta;    
        }
        if (maiorAlerta < consulta.qtdAlerta) {
            maiorAlerta = consulta.qtdAlerta;
            idAlerta = consulta.fkAlerta;
        }
    })
}

function gerenciarGrafico_2(dados) {
    let idMaquinaAtual = 0;

    dados.forEach(consulta => {
        const componente = consulta.componente;
        const index = label.second.findIndex(valor => valor == componente);
        if (
            idMaquinaAtual < consulta.idMaquina
        ) {
            if (idMaquinaAtual != 0) list.second[index]++;
            idMaquinaAtual = consulta.idMaquina;
        }
    })
}


const dataset = {
    first: [{
        label: 'Quantidade de Computadores por Desempenho Mensal',
        data: list.first,
        backgroundColor: [
            '#449ADE',
            '#F2AB27',
            '#F2274C'
        ],
        hoverOffset: 15
    }],
    second: [{
        label: 'Hardwares Prejudicados por Dia',
        data: list.second,
        backgroundColor: '#F2AB27',
        hoverBackgroundColor: '#F2274C',
        borderRadius: 5
    }],
    third: [{
        label: 'Usabilidade Diária por Equipe',
        data: list.third,
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

background.addEventListener("click", () => {
    aparecerPop();
});
