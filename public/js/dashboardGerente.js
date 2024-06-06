const container = document.getElementById('containerInfo');

const fkEmpresa = sessionStorage.getItem("fkEmpresa");


const listaMaquinas = [];

container.innerHTML;

window.onload = (event) => {
    gerarLista();
}

async function getComputadoresQualidade() {
    try {
        const response = await fetch(`/maquina/selecionar/qualidade/${fkEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const dados = response.json();

            return dados
        } else {
            console.error("Houve um erro ao selecionar maquinas por qualidade!");
            
            throw new Error("Houve um erro ao selecionar maquinas por qualidade!")
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);
        return false;
    }
}

function tratarDados(dados) {
    let mesAtual = 0;
    let idMaquinaAtual = 0;
    let maiorAlerta;
    let idAlertaAtual;

    // const lista = {
    //     alerta: [{}, {}, {}],
    // };
 
    dados.forEach(consulta => {
        const idMaquina = consulta.idMaquina;
        const alerta = consulta.qtdAlerta;
        const idAlerta = consulta.fkAlerta;
        const mes = consulta.minuto;

        if (mesAtual < mes) mesAtual = consulta.mes;

        if (
            idMaquinaAtual < idMaquina
        ) {
            idMaquinaAtual = idMaquina;
            maiorAlerta = 0;
            // idAlerta;    
        }

        // if (maiorAlerta < alerta) {
        //     maiorAlerta = alerta;
        //     idAlertaAtual = idAlerta;
        //     lista.alerta[idAlerta-1]++;
        // }
        listaMaquinas.push(consulta)
    })
}

async function gerarLista() {
    const dados = await getComputadoresQualidade();
    const dadosTratados = tratarDados(dados);
    
    for (let index = 0; index < listaMaquinas.length; index++) {
        container.innerHTML = 
        `<div class="container-funcionario" onclick="windowDashboardPessoal()">
        <div class="status-bolinha" id="status"></div>
        <div class="info-funcionario">
            <p id="infoPC">123.123.123.123</p>
            <p id="infoUser">TIGO - nanana</p>
        </div>
        <b id="alerta">ALERTA!</b>
        <img src="../assets/img/computador.png" alt="Computer Image" class="image-computer">
        </div>`       
    }
    
}