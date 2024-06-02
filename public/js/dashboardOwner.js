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
    
    dados = await atualizarGrafico_3(fkEmpresa);
    gerenciarGrafico_3(dados);
    
    dados = await atualizarGrafico_4(fkEmpresa);
    gerenciarGrafico_3(dados);

}
setInterval(async () => {
    gerarDados();
}, 1800000)

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

async function atualizarGrafico_3(fkEmpresa) {
    try {
        const resposta = await fetch(`/maquina/selecionar/quantidade/${fkEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            const dados = await resposta.json();

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

async function atualizarGrafico_4(fkEmpresa) {
    try {
        const resposta = await fetch(`/maquina/selecionar/capturas/${fkEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            const dados = await resposta.json();

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
    let idAlertaAtual;

    dados.forEach(consulta => {
        const idMaquina = consulta.idMaquina;
        const alerta = consulta.qtdAlerta;
        const idAlerta = consulta.fkAlerta;
        // if (consulta.mes >= mesAtual) mesAtual = consulta.mes;

        if (
            idMaquinaAtual < idMaquina
        ) {
            idMaquinaAtual = idMaquina;
            maiorAlerta = 0;
            idAlerta;    
        }
        if (maiorAlerta < alerta) {
            maiorAlerta = alerta;
            idAlertaAtual = idAlerta;
            list.first[idAlerta-1]++;
        }
    })
}

function gerenciarGrafico_2(dados) {
    // let diaAtual = 0;
    let idMaquinaAtual = 0;

    dados.forEach(consulta => {
        const idMaquina = consulta.idMaquina;
        const componente = consulta.componente;
        const index = label.second.findIndex(valor => componente.toLowerCase().includes(valor.toLowerCase()));
        
        // if (consulta.dia >= diaAtual) diaAtual = consulta.dia;
        if (
            idMaquinaAtual < idMaquina
        ) {
            idMaquinaAtual = idMaquina;
            list.second[index]++;
        }
    })
}

function gerenciarGrafico_3(dados) {
    let idMaquinaAtual = 0;
    let componenteAtual;
    let alertaAtual;
    let dataAtual;

    const objetoComp = {
        cpu: [0, 0, 0],
        gpu: [0, 0, 0],
        ram: [0, 0, 0],
        hdd: [0, 0, 0],
    }

    dados.forEach(consulta => {
        const idMaquina = consulta.idMaquina;
        const componente = consulta.componente;
        const idAlerta = consulta.fkAlerta;
        const dataCaptura = new Date(consulta.maxCap);

        if (
            idMaquinaAtual != idMaquina
        ) {
            idMaquinaAtual = idMaquina;
            componenteAtual = 0;
            alertaAtual = 0;
            dataAtual = 0;
        }

        const posicao = idAlerta-1;
        if (
            idMaquinaAtual == idMaquina &&
            componenteAtual != componente
        )  {
            switch (componente) {
                case 'CPU':
                    objetoComp.cpu[posicao]++;
                    break;
                case 'GPU':
                    objetoComp.gpu[posicao]++;
                    break;
                case 'MemoriaRam':
                    objetoComp.ram[posicao]++;
                    break;
                case 'HDD':
                    objetoComp.hdd[posicao]++;
                    break;
                default:
                    break;
            }
        } else if (
            componenteAtual == componente &&
            dataAtual < dataCaptura
        )  {
            const antigaPos = alertaAtual-1;
            switch (componente) {
                case 'CPU':
                    objetoComp.cpu[antigaPos]--;
                    objetoComp.cpu[posicao]++;
                    break;
                case 'GPU':
                    objetoComp.gpu[antigaPos]--;
                    objetoComp.gpu[posicao]++;
                    break;
                case 'MemoriaRam':
                    objetoComp.ram[antigaPos]--;
                    objetoComp.ram[posicao]++;
                    break;
                case 'HDD':
                    objetoComp.hdd[antigaPos]--;
                    objetoComp.hdd[posicao]++;
                    break;
                default:
                    break;
            }
        }
        componenteAtual = componente;
        alertaAtual = idAlerta;
        dataAtual = dataCaptura;
    });

    cpu_ruim.innerHTML = objetoComp.cpu[2]; 
    cpu_medio.innerHTML = objetoComp.cpu[1];
    cpu_bom.innerHTML = objetoComp.cpu[0];
    
    gpu_ruim.innerHTML = objetoComp.gpu[2]; 
    gpu_medio.innerHTML = objetoComp.gpu[1];
    gpu_bom.innerHTML = objetoComp.gpu[0];
    
    ram_ruim.innerHTML = objetoComp.ram[2]; 
    ram_medio.innerHTML = objetoComp.ram[1];
    ram_bom.innerHTML = objetoComp.ram[0];
    
    hdd_ruim.innerHTML = objetoComp.hdd[2]; 
    hdd_medio.innerHTML = objetoComp.hdd[1];
    hdd_bom.innerHTML = objetoComp.hdd[0];
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
        label: ['Indice Mediana/Diária', 'Indice 75% dos Dados/Diária'],
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
