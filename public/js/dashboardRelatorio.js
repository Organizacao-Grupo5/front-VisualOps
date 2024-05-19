const relatoriosCalendarioDiv = document.getElementById(
  "relatorios_calendario"
);

const inputIpv4Nome = document.getElementById("input_name_our_ipv4");
const inputSemana = document.getElementById("input_semana");

const chkDiario = document.getElementById("chk_diario");
const chkSemanal = document.getElementById("chk_semanal");
const chkMensal = document.getElementById("chk_mensal");

const chkProprio = document.getElementById("chk_proprio");
const chkTime = document.getElementById("chk_time");

const btnAplicar = document.getElementById("btn_apl");
const btnResetar = document.getElementById("btn_rs");

const checkBoxesTypeReport = [chkDiario, chkSemanal, chkMensal];

const dataAtual = new Date();

inputSemana.value = `${dataAtual.getFullYear()}-${String(
  dataAtual.getMonth() + 1
).padStart(2, "0")}-${String(dataAtual.getDate()).padStart(2, "0")}`;

const limpaCampos = () => {
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

const abrirRelatorio = () => {
  window.location = "paginaRelatorio.html";
};

const construirCalendarioSemanal = async () => {

  const dataSelecionada = new Date(inputSemana.value);
  const nomesDiasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  let primeiroDiaSemana = new Date(dataSelecionada);
  primeiroDiaSemana.setDate(
    primeiroDiaSemana.getDate() - primeiroDiaSemana.getDay()
  );

  const diasDaSemana = Array.from({ length: 7 }, (_, i) => {
    const dia = new Date(primeiroDiaSemana);
    dia.setDate(dia.getDate() + i);

    return {
      diaPrint: dia.getDate(),
      diaSemana: nomesDiasSemana[dia.getDay()],
      mes: nomesMeses[dia.getMonth()],
      data: dia,
      inicioSemana: i === 0,
      inicioMes: dia.getDate() === 1,
    };
  });

  relatoriosCalendarioDiv.innerHTML = "";

  const promises = diasDaSemana.map(async (dia) => {
    try {
      const dados = await consultarRelatorioDia(
        `${dia.data.getFullYear()}-${
          dia.data.getMonth() + 1
        }-${dia.data.getDate()}`
      );
      console.log(dados);

      if (dados && dados.length > 0) {
        return dados
          .flatMap((lista) =>
            lista.map(
              (dado) => `
                <div class="report-content">
                    <h4>Relatório - ${dado.tipo_relatorio}</h4>
                    <h4>Total de registros: ${dado.total_capturas}</h4>
                    <div class="div-btn-action-report">
                        <button onclick="abrirRelatorio()">ABRIR</button>
                    </div>
                </div>
            `
            )
          )
          .join("");
      } else {
        return "";
      }
    } catch (error) {
      console.error("Erro ao processar os dados:", error);
      return "";
    }
  });

  const htmlContents = await Promise.all(promises);

  relatoriosCalendarioDiv.innerHTML = diasDaSemana
    .map(
      (dia, index) => `
      <div class="day-content" id="day_content_${dia.diaPrint}">
          <div class="day">
              <h4>${dia.diaSemana}</h4>
              <h1>${dia.diaPrint}</h1>
              <h4>${dia.mes}</h4>
          </div>
          ${htmlContents[index]}
      </div>
  `
    )
    .join("");
};

const consultarRelatorioDia = async (data) => {
  let preferencias = {
    data: data,
    nomeIpv4: inputIpv4Nome.value,
    tipo: {
      diario: chkDiario.checked,
      semanal: chkSemanal.checked,
      mensal: chkMensal.checked,
    },
    responsaveis: {
      proprio: chkProprio.checked,
      time: chkTime.checked,
    },
  };

  try {
    const resp = await fetch(
      `/relatorio/${sessionStorage.getItem("idUsuario")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dados: preferencias,
        }),
      }
    );

    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Erro ao obter dados");
    }
  } catch (erro) {
    console.error(erro);
    throw erro;
  }
};

btnResetar.addEventListener("click", limpaCampos);
btnAplicar.addEventListener("click", construirCalendarioSemanal);

document.addEventListener("DOMContentLoaded", construirCalendarioSemanal);
