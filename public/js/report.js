import loadingUtils from "./Utils/loading.js";

let dadosCaptura = [];
let idxAtual = 0;

let capaRelatorio = `
  <div class="content-pdf  capa">
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
              <img src="logofundo.png" alt="Logo">
              <h6 class="footer-text">VisualOps</h6>
          </div>
          <h6 class="footer-text">Relatório de Hardware</h6>
      </div>
  </div>
    `;

let capaRelatorioStylePDF = `
    <div style="width: 100%; height: 1122px; background-color: #f8f9fa; color: #314161; box-shadow: 3px 1px 10px 1px #000; box-sizing: border-box; position: relative; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="padding: 5%;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <img src="logofundo.png" alt="Logo" style="height: 7.13%;width: 19.8%;border-radius: 50%; background-color: #314161; padding: 5px;">
                <div style="text-align: right;">
                    <h6 style="margin: 0; font-size: 80%;">${new Date().getFullYear()}-${
  new Date().getMonth() + 1
}-${new Date().getDate()}</h6>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <h1 style="margin: 0; font-size: 120px; font-weight: bold;">VisualOps</h1>
                <h2 style="margin: 0; font-size: 40px; color: #a8a6a6;">Relatório de Desempenho de Hardware</h2>
            </div>
        </div>
        <div style="padding: 20px; font-size: 6px; margin-top: auto; margin-left: auto; width: 40.29%;">
            <p style="margin: 0; text-align: justify; font-size: 12px;">Este relatório apresenta uma análise detalhada do desempenho dos componentes de hardware do seu sistema, incluindo processador, memória RAM, armazenamento e placa gráfica. Os dados foram coletados e analisados para fornecer insights valiosos sobre o funcionamento do seu computador.</p>
        </div>
        <div style="padding: 20px; background-color: #314161; border-radius: 0; height: 150px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                    <img src="logofundo.png" alt="Logo" style="width: 14%; margin-right: 2.5%;">
                    <h6 style="margin: 0; color: #fff; font-size: 25px;">VisualOps</h6>
                </div>
                <h6 style="margin: 0; color: #fff; font-size: 15px;">Relatório de Hardware</h6>
            </div>
        </div>
    </div>
`;

let paginas = [capaRelatorio];
let paginasEstilizadaPDF = [capaRelatorioStylePDF];

let pdfConteiner = document.getElementById("pdf_content");

let infoDataReport = document.getElementById("info_data_report");

let h5QtdCapturas = document.getElementById("h5_qtd_capturas");
let h5Componentes = document.getElementById("h5_componentes");
let h5TipoRelatorio = document.getElementById("h5_tipo_relatorio");
let h5Data = document.getElementById("h5_data");

const btnPdf = document.getElementById("btn_pdf");
const btnExcel = document.getElementById("btn_xlsx");
const btnEdit = document.getElementById("btn_edit");
const btnExpand = document.getElementById("btn_exp");

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
      }));

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
                <td>${cap.dadoCaptura}</td>
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
      <div style="width: 100%;">
          <canvas id="ctx_${componente}"></canvas>
      </div>
      </div>
    </div>`;

    let pageHtmlToPDF = `
    <div style="width: 100%; height: 1122px; background-color: #f8f9fa; color: #314161; box-shadow: 3px 1px 10px 1px #000; box-sizing: border-box; position: relative; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; padding:5%;">
        <div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h1 style="font-size: 60px;">${componente}</h1>
              <h6 style="font-size: 13px;">Data início: ${formatarData(
                dataInicio
              )}<br>Data fim: ${formatarData(dataFim)}</h6>
            </div>
        </div>
        <h6 style="margin-top:2%; margin-bottom:1%; font-size:16px;"><u>5 capturas mais altas registradas</u></h6>
        <table class="blueTable">
        <thead>
          <tr style="color:#fff;">
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
      <div id="div_chart_img_${componente}"; style="width: 100%;">
          
      </div>
    </div>
    `;
    paginasEstilizadaPDF.push(pageHtmlToPDF);
    paginas.push(pageHtml);
  });
};

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
          },
        },
      });
    } else {
      console.error(`Canvas element with ID ctx_${componente} not found`);
    }

    const divImgCtx = document.getElementById(`div_chart_img_${componente}`);

    const dataUrl = ctx.toDataURL();
    const imgHtml = `<img src="${dataUrl}" />`;

    divImgCtx.innerHTML += imgHtml;
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

function baixarPDF() {
  const pagina = paginasEstilizadaPDF.join(""); 

  const fileName = `relatorio.pdf`;
  html2pdf()
    .from(pagina)
    .toPdf()
    .get("pdf")
    .then(function (pdf) {
      pdf.save(fileName);
    });
}

btnPdf.addEventListener("click", () => {
  baixarPDF();
});

document.addEventListener("DOMContentLoaded", () => {
  const infoCapturas = JSON.parse(sessionStorage.getItem("relatorioDados"));

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

    const inicio = `${dataInicio.getFullYear()}/${addZero(
      dataInicio.getMonth() + 1
    )}/${addZero(dataInicio.getDate())} ${
      "| " +
      addZero(dataInicio.getHours()) +
      ":" +
      addZero(dataInicio.getMinutes())
    }`;

    const fim = `${dataFim.getFullYear()}/${addZero(
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

  gerarPdf();

  gerarGraficos();
});

const containerPDF = document.getElementById("pdf_content");

btnExcel.addEventListener('click', async () => {
  const datas = dadosCaptura.map(dado => new Date(dado.dataCaptura)).filter(date => !isNaN(date));

  const dataInicio = new Date(Math.min(...datas));
  const dataFim = new Date(Math.max(...datas));

  try {
    const resp = await fetch(
      `/relatorio/upload-excel/${JSON.parse(sessionStorage.getItem("relatorioDados")).idMaquina}`,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataInicio: dataInicio,
        dataFim: dataFim,
      }),
    });

    if (resp.ok) {
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio.xlsx';
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

// window.addEventListener("beforeunload", () => {
//   sessionStorage.removeItem("relatorioDados");
// });
