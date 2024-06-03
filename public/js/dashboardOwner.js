const first = document.getElementById("chart_1");
const second = document.getElementById("chart_2");
const third = document.getElementById("chart_horizontal"); 
const colunas = document.getElementsByClassName('colunas_status');
const background = document.getElementById("bg");
const pop = document.getElementById("pop");

const fkEmpresa = sessionStorage.getItem("fkEmpresa");

const list = {
    first: [0, 0, 0],
    second: [0, 0, 0, 0],
    third: [
        [],
        []
    ],
}

const label = {
    first: ['Alto', 'Médio', 'Baixo'],
    second: ['CPU', 'GPU', 'RAM', 'HDD'],
    third: [],
}

const listaComp = [];
const comp_graf3 = document.getElementById('comp_graf3');
const componentes = {
    nome: [],
    value: [],
    unidadeMedida: [],
    nomeUniMedida: []
}

window.onload = async () => {
    const dados = await listarComponentes();
    gerenciarLista(dados);
    gerarDados();
};

async function gerarDados() {    
    let dados;

    dados = await atualizarGrafico_1();
    gerenciarGrafico_1(dados);
    
    dados = await atualizarGrafico_2();
    gerenciarGrafico_2(dados);
    
    dados = await atualizarGrafico_3();
    gerenciarGrafico_3(dados);
    
    dados = await atualizarGrafico_4(comp_graf3.innerText);
    gerenciarGrafico_4(dados);

    atualizarCharts();
    totalGrafico1();
    
}

setInterval(async () => {
    gerarDados();
}, 1800000)


async function listarComponentes() {
    try {
        const resposta = await fetch(`/maquina/selecionar/componentes/${fkEmpresa}`, {
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

function gerenciarLista(dados) {
    let componenteAtual;
    let nomes = componentes.nome;
    let values = componentes.value;

    dados.forEach(consulta => {
        const componente = consulta.componente;
        const uniMedida = consulta.uni;
        let nomeUniMedida;

        if (
            componenteAtual != componente &&
            (nomes == 0 ||
            !nomes.some(nome => nome == componente)) 
        ) {
            componenteAtual = componente;
            componentes.unidadeMedida.push(uniMedida);
            let novoNome;
            switch (componente) {
                case "MemoriaRam":
                    novoNome = "RAM"
                    break;
                case "SistemaOp":
                    novoNome = "SO"
                    break;
                default:
                    novoNome = componente;
                    break;
            }
            switch (uniMedida) {
                case '%':
                    nomeUniMedida = "Porcentagem";
                    break;
                case 'GB':
                    nomeUniMedida = "Armazenamento";
                    break;
                case '°C':
                    nomeUniMedida = "Temperatura";
                    break;
                default:
                    nomeUniMedida = "Desempenho";
                    break;
            }
            nomes.push(novoNome);
            values.push(componente);
            componentes.nomeUniMedida.push(nomeUniMedida);
        }
    })
    comp_graf3.innerText = nomes[0];
    comp_graf3.value = values[0];
    unidadeMedida = componentes.nomeUniMedida;
}

async function atualizarGrafico_1() {
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

async function atualizarGrafico_2() {
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
            console.error("Houve um erro ao selecionar componentes prejudicados!");
            
            throw new Error("Houve um erro ao selecionar componentes prejudicados!")
        }
    } catch (error) {
        console.log("Erro desconhecido na API ", error);
        return false;
    };
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

async function atualizarGrafico_3() {
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
            console.error("Houve um erro ao selecionar qunatidade de componentes!");
            
            throw new Error("Houve um erro ao selecionar qunatidade de componentes!")
        }
    } catch (error) {
        console.log("Erro desconhecido na API ", error);
        return false;
    };
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

async function atualizarGrafico_4(componente) {
    try {
        const resposta = await fetch(`/maquina/selecionar/${componente}/${fkEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            const dados = await resposta.json();

            return dados;
        } else {
            console.error("Houve um erro ao selecionar componente!");
            
            throw new Error("Houve um erro ao selecionar componente!")
        }
    } catch (error) {
        console.log("Erro desconhecido na API ", error);
        return false;
    };
}

function gerenciarGrafico_4(dados) {
    let listaMediana = [];
    let diaAtual = 0;
    
    let newIndex = list.third[0].length;
    dados.forEach((consulta, index) => {
        
        if (list.third[0].length >= 1) {
            for (let i = 0; i < newIndex; i++) {
                list.third[0].pop();
                list.third[1].pop();
                label.third.pop();
            }
            newIndex = 0;
        }

        const dia = consulta.minuto;
        const dado = Math.round(consulta.dadoCaptura);
        
        
        if ((diaAtual != dia && diaAtual != 0) || dados.length - 1 == index) {            
            if (listaMediana.length >= 1) {
                let center = listaMediana.length / 2;
                let mediana;
                
                if (listaMediana.length == 1) {
                    mediana = listaMediana[0];
                } else if (listaMediana.length % 2 == 1) {
                    mediana = (listaMediana[(center + .5)] + listaMediana[(center - .5)]) / 2
                } else {
                    mediana = listaMediana[center];
                }
                list.third[0].push(mediana);

                let media = 0;
                listaMediana.map(valor => {
                    media += valor;
                });
                media = media / listaMediana.length;

                list.third[1].push(media);
            }
        }

        if (diaAtual != 0 && (diaAtual != dia || dados.length - 1 == index)) {
            label.third.push(diaAtual);
        }
        if (diaAtual < dia) {
            diaAtual = dia;
        }

        let newValor = dado;
        if (newValor > 10 && newValor <= 100) {
            newValor = Number.parseFloat(dado / 10);
        } else if (newValor > 100 && newValor <= 1000) {
            newValor = Number.parseFloat(dado / 100);
        } else if (newValor > 1000) {
            newValor = Number.parseFloat(dado / 1000);
        }
        listaMediana.push(newValor);
        
    });
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
        label: `Índice Mediana / Desempenho`,
        data: list.third[0],
        backgroundColor: '#449ADE',
        borderColor: '#449ADE',
        hoverBackgroundColor: '#449ADE',
        tension: 0.2,
    }, {
        label: `Índice 75% dos Dados / Desempenho`,
        data: list.third[1],
        backgroundColor: '#314161',
        borderColor: '#36334F',
        hoverBackgroundColor: '#36334F',
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

let chart_1 = new Chart(first, {
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

let chart_2 = new Chart(second, {
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

let chart_3 = new Chart(third, {
    type: 'line',
    data: datas.toThird,
    options: {
        responsive: true,
        maintainAspectRatio: false,
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
        },
        scales: {
            y: {
                max: 10,
                min: 0,
                ticks: {
                    beginAtZero: false
                }
            }
        },
    }
});

function totalGrafico1() {
    const dados = dataset.first[0].data;
    console.log(dados);

    let total = 0;

    for (let i = 0; i < dados.length; i++) {
        console.log(dados[i]);
        total += dados[i];
    }
    console.log("document.getElementById('qtdTotal')");
    console.log(document.getElementById('qtdTotal'));
    console.log("total");
    console.log(total);

    document.getElementById('qtdTotal').innerText = total;
    
    console.log(document.getElementById('qtdTotal'));
}

async function moverRight() {
    const nomes = componentes.nome;

    const posicao = nomes.findIndex(nome => nome == comp_graf3.innerText);

    if (posicao == 6) {
        comp_graf3.innerText = nomes[0];
        comp_graf3.value = componentes.value[0];
    } else {
        comp_graf3.innerText = nomes[posicao+1];
        comp_graf3.value = componentes.value[posicao+1];
    }
    const componente = comp_graf3.value;
    const dados = await atualizarGrafico_4(componente);
    gerenciarGrafico_4(dados);
    atualizarCharts();
}    

async function moverLeft() {
    const nomes = componentes.nome;

    const lastPos = nomes.length-1;
    
    const posicao = nomes.findIndex(nome => nome == comp_graf3.innerText);

    if (posicao == 0) {
        comp_graf3.innerText = nomes[lastPos];
        comp_graf3.value = componentes.value[lastPos];
    } else {
        comp_graf3.innerText = nomes[posicao-1];
        comp_graf3.value = componentes.value[posicao-1];
    }
    const componente = comp_graf3.value;
    const dados = await atualizarGrafico_4(componente);
    gerenciarGrafico_4(dados);
    atualizarCharts();
}

function atualizarCharts() {
    chart_1.update();
    chart_2.update();
    chart_3.update();
}
