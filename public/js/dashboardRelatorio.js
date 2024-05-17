const relatoriosCalendarioDiv = document.getElementById("relatorios_calendario");

const inputIpv4Nome = document.getElementById("input_name_our_ipv4");
const inputSemana = document.getElementById("input_semana");

const chkDiario = document.getElementById("chk_diario");
const chkSemanal = document.getElementById("chk_semanal");
const chkMensal = document.getElementById("chk_mensal");

const chkProprio = document.getElementById("chk_proprio");
const chkTime = document.getElementById("chk_time");

const chkTodosComponente = document.getElementById("chk_todos_componente");

const chkCPU = document.getElementById("chk_cpu");
const chkGPU = document.getElementById("chk_gpu");
const chkHDD = document.getElementById("chk_hdd");
const chkRAM = document.getElementById("chk_ram");
const chkApp = document.getElementById("chk_app");

const btnAplicar = document.getElementById("btn_apl");
const btnResetar = document.getElementById("btn_rs");

const checkBoxesTypeReport = [chkDiario, chkSemanal, chkMensal];
const checkBoxesComponentes = [chkCPU, chkGPU, chkHDD, chkRAM, chkApp];

const dataAtual = new Date();

inputSemana.value = `${dataAtual.getFullYear()}-${String(
  dataAtual.getMonth() + 1
).padStart(2, "0")}-${String(dataAtual.getDate()).padStart(2, "0")}`;

chkTodosComponente.addEventListener("change", () => {
  if (chkTodosComponente.checked) {
    checkBoxesComponentes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
});

checkBoxesComponentes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkBoxesComponentes.every((checkbox) => checkbox.checked)) {
      checkBoxesComponentes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      chkTodosComponente.checked = true;
    } else {
      chkTodosComponente.checked = false;
    }
  });
});

const limpaCampos = () => {
  checkBoxesComponentes.forEach((chk) => {
    chk.checked = false;
  });

  chkTodosComponente.checked = false;

  chkProprio.checked = false;
  chkTime.checked = false;

  checkBoxesTypeReport.forEach((chk) => {
    chk.checked = false;
  });

  inputIpv4Nome.value = "";

  inputSemana.value = `${dataAtual.getFullYear()}-${String(
    dataAtual.getMonth() + 1
  ).padStart(2, "0")}-${String(dataAtual.getDate()).padStart(2, "0")}`;
};

const construirCalendarioSemanal = async () => {
  const dataSelecionada = new Date(inputSemana.value);
  const nomesDiasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro','Dezembro'];

  let ultimoDiaMesAtual = new Date(new Date(dataSelecionada).getFullYear(), new Date(dataSelecionada).getMonth() + 1, 0).getDate();

  const diasDaSemana = Array.from({ length: 7 }, (_, i) => {
      let dia = dataSelecionada.getDate() - dataSelecionada.getDay() + i;

      let diaPrint = dia;
      
      if(dia > ultimoDiaMesAtual){
        diaPrint = dia - ultimoDiaMesAtual
      }

      if(diaPrint <= 0){
        let ultimoDiaMesPassado = new Date(new Date(dataSelecionada).getFullYear(), new Date(dataSelecionada).getMonth(), 0).getDate();
        diaPrint = ultimoDiaMesAtual - diaPrint;
      }

      
      
      const data = new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth(), dia);

      return {
          diaPrint,  
          diaSemana: nomesDiasSemana[data.getDay()],
          mes: nomesMeses[data.getMonth()],
          data: data,
          inicioSemana: data.getDate() == 0,
          inicioMes: data.getDay == 1,
      };
  });

  relatoriosCalendarioDiv.innerHTML = "";

  const promises = diasDaSemana.map(async (dia) => {
    try {
        const dados = await consultarRelatorioDia(`${dia.data.getFullYear()}-${dia.data.getMonth() + 1}-${dia.data.getDate()}`);
        return dados.map((dado, index) => `
            <div class="report-content">
                <h4>Relatório - ${dado.componente}</h4>
                <h4>Tipo: ${diasDaSemana[index].inicioMes ? "Mensal," : ""}${diasDaSemana[index].inicioSemana ? "Semanal," : ""}Diário</h4>
                <h4>Total de registros: ${dado.total_relatorio_dia}</h4>
                <div class="div-btn-action-report">
                    <button>ABRIR</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao processar os dados:', error);
        return '';
    }
});

const htmlContents = await Promise.all(promises);

relatoriosCalendarioDiv.innerHTML = diasDaSemana.map((dia, index) => `
    <div class="day-content" id="day_content_${dia.diaPrint}">
        <div class="day">
            <h4>${dia.diaSemana}</h4>
            <h1>${dia.diaPrint}</h1>
            <h4>${dia.mes}</h4>
        </div>
        ${htmlContents[index]}
    </div>
`).join('');
}

const consultarRelatorioDia = async(data) => {
  let preferencias = {
    data: data,
    nomeIpv4: inputIpv4Nome.value,
    tipo: {
      diario: chkDiario.checked,
      semanal: chkSemanal.checked,
      mensal: chkMensal.checked
    },
    responsaveis: {
      proprio: chkProprio.checked,
      time: chkTime.checked,
    },
    componente: {
      cpu: chkCPU.checked,
      ram: chkRAM.checked,
      hdd: chkHDD.checked,
      gpu: chkGPU.checked,
      app: chkApp.checked
    }
  }

  if(chkTodosComponente.checked){
    for(let componente in preferencias.componente){
      preferencias.componente[componente] = true;
    }
  }

  try {
    const resp = await fetch(`/relatorio/${sessionStorage.getItem('idUsuario')}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dados: preferencias,
      })
    });

    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error('Erro ao obter dados');
    }
  } catch (erro) {
    console.error(erro);
    throw erro; 
  }

}

btnResetar.addEventListener("click", limpaCampos);
btnAplicar.addEventListener("click", construirCalendarioSemanal);

document.addEventListener('DOMContentLoaded', construirCalendarioSemanal);