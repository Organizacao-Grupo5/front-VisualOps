import loadingUtils from "./Utils/loading.js";

let dadosCaptura = [];
let idxAtual = 0;

let capaRelatorio = `
  <div class="content-pdf">
      <div class="container">
          <div class="header">
              <img src="logofundo.png" alt="Logo" class="logo">
              <div class="header-text">
                  <h6 class="date">${new Date().getFullYear()}-${
  new Date().getMonth() + 1
}-${new Date().getDate()}</h6>
              </div>
          </div>
          <div style="margin-top: 20px;">
              <h1 class="title">VisualOps</h1>
              <h2 class="subtitle">Relatório de Desempenho de Hardware</h2>
          </div>
      </div>
      <div class="description">
          <p>Este relatório apresenta uma análise detalhada do desempenho dos componentes de hardware do seu sistema, incluindo processador, memória RAM, armazenamento e placa gráfica. Os dados foram coletados e analisados para fornecer insights valiosos sobre o funcionamento do seu computador.</p>
      </div>
      <div class="footer">
          <div class="footer-logo">
              <img class="footer-img" src="logofundo.png" alt="Logo">
              <h6 class="footer-text">VisualOps</h6>
          </div>
          <h6 class="footer-text">Relatório de Hardware</h6>
      </div>
  </div>
    `;

let paginas = [capaRelatorio];

let pdfConteiner = document.getElementById("pdf_content");

let infoDataReport = document.getElementById("info_data_report");

let h5QtdCapturas = document.getElementById("h5_qtd_capturas");
let h5Componentes = document.getElementById("h5_componentes");
let h5TipoRelatorio = document.getElementById("h5_tipo_relatorio");
let h5Data = document.getElementById("h5_data");

const btnPdf = document.getElementById("btn_pdf");
const btnExcel = document.getElementById("btn_xlsx");
const btnExpand = document.getElementById("btn_exp");
const tabRelatorio = document.getElementById("tab_relatorio");
const tabTabelaRegistro = document.getElementById("tab_tabela_registro");

const gerarPdf = () => {
  pdfConteiner.innerHTML += paginas.join("");
};

const gerarPaginas = () => {
  let componentes = Array.from(
    new Set(dadosCaptura.map((item) => item.componente))
  );

  componentes.forEach((componente) => {
    const datas = Array.from({ length: dadosCaptura.length }, (_, i) => {
      if (dadosCaptura[i].componente == componente) {
        return new Date(dadosCaptura[i].dataCaptura);
      }
    }).filter((date) => !isNaN(date));

    const todasCapturas = dadosCaptura
      .filter((item) => item.componente == componente)
      .map((item) => ({
        dataCaptura: item.dataCaptura,
        dadoCaptura: item.dadoCaptura,
        unidadeMedida: item.unidadeMedida,
      }));

    console.log(todasCapturas);

    const dataInicio = new Date(
      datas.reduce((a, b) => {
        return a < b ? a : b;
      })
    );

    const dataFim = new Date(
      datas.reduce((a, b) => {
        return a > b ? a : b;
      })
    );

    const top5Capturas = todasCapturas
      .sort((a, b) => {
        b.dadoCaptura - a.dadoCaptura;
      })
      .slice(0, 5);

    const table = top5Capturas
      .map((cap, index) => {
        return `<tr>
                <td>${componente}</td>
                <td>${parseFloat(cap.dadoCaptura).toFixed(2)}${
          todasCapturas[0].unidadeMedida
        }</td>
                <td>${formatarData(new Date(cap.dataCaptura))}</td>
            </tr>`;
      })
      .join("");

    let pageHtml = `
    <div class="content-pdf ${componente}">
      <div class="container">
        <div class="header">
          <h1>${componente}</h1>
          <h6 style="font-size: 8px;">Data início: ${formatarData(
            dataInicio
          )}<br>Data fim: ${formatarData(dataFim)}</h6>
        </div>
        <h6 style="margin-top:2%; margin-bottom:1%;"><u>5 capturas mais altas registradas</u></h6>
        <table class="blueTable">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Captura</th>
              <th>Data hora</th>
            </tr>
          </thead>
          <tbody>
            ${table}           
          </tbody>
        </table> 
        <h6 style="margin-top:2%; margin-bottom:1%;"><u>Gráfico das capturas registradas</u></h6>
        <div class="div-grafico">
          <canvas id="ctx_${componente}"></canvas>
        </div>
      </div>
    </div>`;
    paginas.push(pageHtml);
  });
};

let listIdGraficos = [];
let listLabelsGrafico = [];
let listDadosGrafico = [];

const gerarGraficos = () => {
  const componentes = Array.from(
    new Set(dadosCaptura.map((captura) => captura.componente))
  );

  componentes.forEach((componente) => {
    const limitarDados = (labels, dados, maxPoints) => {
      if (labels.length <= maxPoints) {
        return { limitedLabels: labels, limitedData: dados };
      }

      const limitedLabels = [labels[0]];
      const limitedData = [dados[0]];

      const step = Math.floor((labels.length - 2) / (maxPoints - 2));

      for (let i = 1; i < labels.length - 1; i += step) {
        limitedLabels.push(labels[i]);
        limitedData.push(dados[i]);
      }

      limitedLabels.push(labels[labels.length - 1]);
      limitedData.push(dados[dados.length - 1]);

      return { limitedLabels, limitedData };
    };

    const labels = dadosCaptura
      .filter((item) => item.componente === componente)
      .map((item) => new Date(item.dataCaptura).toLocaleDateString());
    const dados = dadosCaptura
      .filter((item) => item.componente === componente)
      .map((item) => item.dadoCaptura);

    const ctx = document.getElementById(`ctx_${componente}`);

    listIdGraficos.push(`ctx_${componente}`);
    listLabelsGrafico.push(labels);
    listDadosGrafico.push(dados);

    if (ctx) {
      const maxPoints = 4;
      const { limitedLabels, limitedData } = limitarDados(
        labels,
        dados,
        maxPoints
      );
      new Chart(ctx, {
        type: "line",
        data: {
          labels: limitedLabels,
          datasets: [
            {
              label: "Capturas",
              data: limitedData,
              borderWidth: 1,
              pointRadius: 0,
              pointHoverRadius: 0,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              ticks: {
                font: {
                  size: 7,
                },
              },
            },
          },
        },
      });
    } else {
      console.error(`Canvas element with ID ctx_${componente} not found`);
    }
  });
};

const formatarData = (data) => {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  return `${ano}/${mes}/${dia} | ${horas}:${minutos}`;
};

const alterarPagina = () => {
  let todasPaginas = document.querySelectorAll(".content-pdf");

  const pdfWidth = todasPaginas[idxAtual].clientWidth + 100;
  const movimento = -pdfWidth * idxAtual;

  containerPDF.style.transform = `translateX(${movimento}px)`;
};

const aumentarVisualizacao = () => {
  let todasPaginas = document.querySelectorAll(".content-pdf");
  const pdfWidth = todasPaginas[0].clientWidth + 100;
  const movimento = -pdfWidth * 0;

  containerPDF.style.transform = `translateX(${movimento}px)`;

  let existingClone = document.querySelector(".pdf-clone");
  let divExpand;

  if (!existingClone) {
    const pdfContainerClone = containerPDF.cloneNode(true);
    pdfContainerClone.classList.add("pdf-clone");
    pdfContainerClone.classList.remove("content-pdf");

    divExpand = document.createElement("div");
    divExpand.classList.add("div-expand");

    const btnClose = document.createElement("button");
    btnClose.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    btnClose.classList.add("botao-fechar");

    divExpand.appendChild(pdfContainerClone);
    divExpand.appendChild(btnClose);
    document.body.appendChild(divExpand);

    pdfContainerClone.style.transform = "none";
    pdfContainerClone.style.width = "auto";

    let novosIds = listIdGraficos.map((id) => {
      let grafico = pdfContainerClone.querySelector(`#${id}`);
      console.log("grafico:", grafico);
      let novoId = id + "_clone";
      grafico.id = novoId;
      console.log("novoId:", novoId);
      return novoId;
    });

    novosIds.forEach((componente, index) => {
      const limitarDados = (labels, dados, maxPoints) => {
        if (labels.length <= maxPoints) {
          return { limitedLabels: labels, limitedData: dados };
        }

        console.log(labels);
        console.log(dados);

        const limitedLabels = [labels[0][0]];
        const limitedData = [dados[0][0]];

        const step = Math.floor((labels.length - 2) / (maxPoints - 2));

        for (let i = 1; i < labels.length - 1; i += step) {
          limitedLabels.push(labels[i]);
          limitedData.push(dados[i]);
        }

        limitedLabels.push(labels[labels.length - 1]);
        limitedData.push(dados[dados.length - 1]);

        return { limitedLabels, limitedData };
      };

      const labels = listLabelsGrafico[index];
      const dados = listDadosGrafico[index];

      const ctx = document.getElementById(componente);

      if (ctx) {
        const maxPoints = 4;
        const { limitedLabels, limitedData } = limitarDados(
          labels,
          dados,
          maxPoints
        );
        new Chart(ctx, {
          type: "line",
          data: {
            labels: limitedLabels,
            datasets: [
              {
                label: "Capturas",
                data: limitedData,
                borderWidth: 1,
                pointRadius: 0,
                pointHoverRadius: 0,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                ticks: {
                  font: {
                    size: 7,
                  },
                },
              },
            },
          },
        });
      } else {
        console.error(`Canvas element with ID ctx_${componente} not found`);
      }
    });

    btnClose.addEventListener("click", () => {
      divExpand.style.display = "none";
    });
  } else {
    divExpand = existingClone.parentElement;
    divExpand.style.display = "block";
  }
};

async function baixarPDF() {
  const pdfHtml = document.querySelector(".pdf-clone");

  pdfHtml.style.flexDirection = "column";
  pdfHtml.style.margin = 0;
  pdfHtml.style.padding = 0;
  pdfHtml.style.gap = 0;
  pdfHtml.style.width = "595.28pt";

  const contentElements = pdfHtml.querySelectorAll(".content-pdf");

  pdfHtml.querySelector(".logo").style.width = "200pt";
  pdfHtml.querySelector(".header").style.padding = "5%";
  pdfHtml.querySelector(".logo").style.height = "200pt";
  pdfHtml.querySelector(".logo").style.borderRadius = "200pt";
  pdfHtml.querySelector(".date").style.fontSize = "22px";
  pdfHtml.querySelector(".title").style.fontSize = "80px";
  pdfHtml.querySelector(".subtitle").style.fontSize = "40px";
  pdfHtml.querySelector(".title").style.marginLeft = "5%";
  pdfHtml.querySelector(".subtitle").style.marginLeft = "5%";
  pdfHtml.querySelector(".footer").style.height = "100pt";
  pdfHtml.querySelector(".footer-text").style.fontSize = "22px";
  pdfHtml.querySelector(".footer-img").style.height = "50pt";
  pdfHtml.querySelector(".footer-img").style.width = "50pt";

  contentElements.forEach((element) => {
    element.style.width = "595.28pt";
    element.style.height = " 841.89pt";
  });

  try {
    const options = {
      filename: "relatorio-visualOps.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    await html2pdf().set(options).from(pdfHtml).save();
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
  }
}

btnPdf.addEventListener("click", () => {
  baixarPDF();
});

btnExpand.addEventListener("click", () => {
  aumentarVisualizacao();
});

document.addEventListener("DOMContentLoaded", async () => {
  const infoCapturas = JSON.parse(sessionStorage.getItem("relatorioDados"));

  let fim = 0;
  let inicio = 0;

  if (infoCapturas) {
    dadosCaptura = infoCapturas.dados;
    loadingUtils.showLoadingPopup();

    gerarPaginas();

    loadingUtils.hideLoadingPopup();

    h5QtdCapturas.innerHTML += infoCapturas.dados.length;

    const datas = Array.from({ length: infoCapturas.dados.length }, (_, i) => {
      return infoCapturas.dados[i].dataCaptura;
    });

    const dataInicio = new Date(
      datas.reduce((a, b) => {
        return a < b ? a : b;
      })
    );

    const dataFim = new Date(
      datas.reduce((a, b) => {
        return a > b ? a : b;
      })
    );

    const addZero = (num) => (num < 10 ? "0" + num : num);

    inicio = `${dataInicio.getFullYear()}/${addZero(
      dataInicio.getMonth() + 1
    )}/${addZero(dataInicio.getDate())} ${
      "| " +
      addZero(dataInicio.getHours()) +
      ":" +
      addZero(dataInicio.getMinutes())
    }`;

    fim = `${dataFim.getFullYear()}/${addZero(
      dataFim.getMonth() + 1
    )}/${addZero(dataFim.getDate())} ${
      "| " + addZero(dataFim.getHours()) + ":" + addZero(dataFim.getMinutes())
    }`;

    infoDataReport.innerHTML = `Relatório(s) ${infoCapturas.tipo} - Início: ${inicio} - Fim: ${fim}`;

    h5Componentes.innerHTML += Array.from(
      new Set(infoCapturas.dados.map((item) => item.componente))
    ).join(", ");

    h5Data.innerHTML += inicio + " até " + fim;
  } else {
    console.log("Nenhum dado de relatório encontrado.");
  }

  if (tabRelatorio.value == "activate") {
    document.getElementById("tab_1").style.display = "flex";
    document.getElementById("tab_2").style.display = "none";
  } else if (tabTabelaRegistro.value == "activate") {
    document.getElementById("tab_1").style.display = "none";
    document.getElementById("tab_2").style.display = "flex";
  }

  gerarPdf();
  gerarGraficos();

  document.getElementById("info_tabela_registro").innerHTML = `
    Tabelas de registros do componentes (${inicio} | ${fim});
  `;

  const tabs = Array.from(
    new Set(infoCapturas.dados.map((item) => item.componente))
  );

  tabs.forEach((componente, index) => {
    document.getElementById("tabs_componente").innerHTML += `
      <button value="${
        index === 0 ? "activate" : "disable"
      }" class="tab-table" id="tab_${componente}">${componente.toUpperCase()}</button>
    `;

    const containerTable = document.createElement("div");
    containerTable.id = `container_table_${componente}`;
    containerTable.classList.add("container-table");

    containerTable.innerHTML += `
      <div class="actions-table">
        <button id="print_table_${componente}">Print</button>
        <button id="download_xlsx_${componente}">Download XLSX</button>
        <button id="download_pdf_${componente}">Download PDF</button>
      </div>
      <div class="tabulator" style="height:100%;" id="tabela_${componente}"></div>
    `;

    document.getElementById("div_tab_tables").appendChild(containerTable);

    let dadosTab = dadosCaptura
      .filter((dado) => {
        return dado.componente === tabs[index];
      })
      .map((dado) => {
        dado.dadoCaptura = parseFloat(dado.dadoCaptura).toFixed(2);
        return dado;
      });

    let table = new Tabulator(document.getElementById(`tabela_${componente}`), {
      layout: "fitColumns",
      pagination: "local",
      paginationSize: 10,
      paginationSizeSelector: [3, 6, 8, 10, dadosTab.length],
      movableColumns: true,
      printAsHtml: true,
      printHeader: `<h1>Informações sobre as capturas do(a) ${componente}<h1>`,
      printFooter:
        "<h5>Este relatório é gerado com base nos dados registrados dos componentes listados. Os dados apresentados são para referência e análise. Qualquer uso ou interpretação desses dados deve ser feito com cuidado e consideração das condições específicas de cada componente. Para informações mais detalhadas ou consultas adicionais, entre em contato conosco. Agradecemos sua atenção e confiança em nossos serviços.<h5>",
      paginationCounter: "rows",
      data: dadosTab,
      columns: [
        { title: "Componente", field: "componente", width: 150 },
        {
          title: `Captura (${dadosTab[0].unidadeMedida})`,
          field: "dadoCaptura",
          hozAlign: "left",
        },
        {
          title: "Data hora",
          field: "dataCaptura",
          sorter: "date",
          hozAlign: "center",
        },
      ],
    });

    document
      .getElementById(`print_table_${componente}`)
      .addEventListener("click", function () {
        table.print(false, true);
      });

    document
      .getElementById(`download_xlsx_${componente}`)
      .addEventListener("click", function () {
        table.download("xlsx", "data.xlsx", {
          sheetName: `Relatório VisualOps | ${componente}`,
        });
      });

    document
      .getElementById(`download_pdf_${componente}`)
      .addEventListener("click", function () {
        table.download("pdf", "data.pdf", {
          orientation: "portrait",
          title: `Relatório sobre o uso do(a) ${componente}`,
        });
      });

    if (index !== 0) {
      containerTable.style.display = "none";
    }
  });

  document.querySelectorAll(".tab-table").forEach((tab, index) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab-table").forEach((t) => {
        t.value = "disable";
      });
      document.querySelectorAll("[id^='container_table_']").forEach((div) => {
        div.style.display = "none";
      });

      tab.value = "activate";
      document.getElementById(`container_table_${tabs[index]}`).style.display =
        "flex";
    });
  });

  const userInfos = await infoMaquinaUsuario(infoCapturas.idMaquina);
  let imgRespRelatorio = document.getElementById("img_user_report");

  await coletaImgUserLogado(imgRespRelatorio, userInfos[0].imagemPerfil);

  document.getElementById('user_info_report').innerHTML = `
    <h4><u>Informações do usuário</u></h4>
    <h6>Nome: ${userInfos[0].nome}</h6>
    <h6>E-mail: ${userInfos[0].email}</h6>
    <h6>Cargo: ${userInfos[0].cargo}</h6>
  `;
  document.getElementById('machine_info_report').innerHTML = `
    <h4><u>Informações da máquina</u></h4>
    <h6>N°: ${userInfos[0].numeroIdentificacao}</h6>
    <h6>Modelo: ${userInfos[0].modelo}</h6>
    <h6>Marca: ${userInfos[0].marca}</h6>
    <h6>Hostname: ${userInfos[0].hostname}</h6>
  `;
  document.getElementById('ipv4_info_report').innerHTML = `
    <h4><u>Informações de IP da máquina</u></h4>
    <h6>N° IP (1): ${userInfos[0].numeroIP.split(",")[0]}</h6>
    <h6>Nome Local (1): ${userInfos[0].nomeLocal.split(",")[0]}</h6>
    <h6>N° IP (2): ${userInfos[0].numeroIP.split(",")[1]}</h6>
    <h6>Nome Local (2): ${userInfos[0].nomeLocal.split(",")[1]}</h6>
  `;
});

const coletaImgUserLogado = async (elemento, caminhoImg) => {
  try {
    const response = await fetch("/firebase/imagem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ caminho: caminhoImg }),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar a imagem.");
    }

    const blob = await response.blob();
    const imagemURL = URL.createObjectURL(blob);

    elemento.src = imagemURL;
  } catch (error) {
    console.error(error);
  }
};

tabRelatorio.addEventListener("click", () => {
  if ((tabRelatorio.value = "disable")) {
    document.getElementById("tab_1").style.display = "flex";
    document.getElementById("tab_2").style.display = "none";
    tabTabelaRegistro.value = "disable";
    tabRelatorio.value = "activate";
  }
});

tabTabelaRegistro.addEventListener("click", () => {
  if ((tabTabelaRegistro.value = "disable")) {
    document.getElementById("tab_2").style.display = "flex";
    document.getElementById("tab_1").style.display = "none";
    tabRelatorio.value = "disable";
    tabTabelaRegistro.value = "activate";
  }
});

const containerPDF = document.getElementById("pdf_content");

btnExcel.addEventListener("click", async () => {
  const datas = dadosCaptura
    .map((dado) => new Date(dado.dataCaptura))
    .filter((date) => !isNaN(date));

  const dataInicio = new Date(Math.min(...datas));
  const dataFim = new Date(Math.max(...datas));

  try {
    const resp = await fetch(
      `/relatorio/upload-excel/${
        JSON.parse(sessionStorage.getItem("relatorioDados")).idMaquina
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataInicio: dataInicio,
          dataFim: dataFim,
        }),
      }
    );

    if (resp.ok) {
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      throw new Error("Erro ao obter relatório");
    }
  } catch (erro) {
    console.error(erro);
    throw erro;
  }
});

const btnLeft = document
  .getElementById("btn_left")
  .addEventListener("click", () => {
    if (idxAtual > 0) {
      idxAtual--;
      alterarPagina();
    }
  });

const btnRight = document
  .getElementById("btn_right")
  .addEventListener("click", () => {
    if (idxAtual < paginas.length - 1) {
      idxAtual++;
      containerPDF.style;
      alterarPagina();
    }
  });

const infoMaquinaUsuario = async (idMaquina) => {
  try {
    const response = await fetch(`/relatorio/usuarioMaquina/${idMaquina}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar informações do usuário máquina: " + err);
    return null;
  }
};

// window.addEventListener("beforeunload", () => {
//   sessionStorage.removeItem("relatorioDados");
// });
