let capaRelatorio = `
        <div style="width: 100%; height: 100%; background-color: #f8f9fa; color: #314161; box-shadow: 3px 1px 10px 1px #000; box-sizing: border-box; position: relative; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <img src="logofundo.png" alt="Logo" style="width: 80px; height: 80px; border-radius: 50%; background-color: #314161; padding: 5px;">
                    <div style="text-align: right;">
                        <h6 style="margin: 0;">${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}</h6>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <h1 style="margin: 0; font-size: 44px; font-weight: bold;">VisualOps</h1>
                    <h2 style="margin: 0; font-size: 22px; color: #a8a6a6;">Relatório de Desempenho de Hardware</h2>
                </div>
            </div>
            <div style="padding: 20px; font-size: 6px; margin-top: auto; margin-left:auto; width: 50%;">
                <p style="margin: 0; text-align: justify;">Este relatório apresenta uma análise detalhada do desempenho dos componentes de hardware do seu sistema, incluindo processador, memória RAM, armazenamento e placa gráfica. Os dados foram coletados e analisados para fornecer insights valiosos sobre o funcionamento do seu computador.</p>
            </div>
            <div style="padding: 20px; background-color: #314161;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center;">
                        <img src="logofundo.png" alt="Logo" style="width: 20px; height: 20px; margin-right: 10px;">
                        <h6 style="margin: 0; color: #fff;">VisualOps</h6>
                    </div>
                    <h6 style="margin: 0; color: #fff;">Relatório de Hardware</h6>
                </div>
            </div>
        </div>
    `;

let capaRelatorioStylePDF = `
    <div style="width: 100%; height: 1122px; background-color: #f8f9fa; color: #314161; box-shadow: 3px 1px 10px 1px #000; box-sizing: border-box; position: relative; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="padding: 5%;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <img src="logofundo.png" alt="Logo" style="height: 7.13%;width: 19.8%;border-radius: 50%; background-color: #314161; padding: 5px;">
                <div style="text-align: right;">
                    <h6 style="margin: 0; font-size: 80%;">${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}</h6>
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
let paginasEstilizadaPDF = [capaRelatorioStylePDF]

let pdfConteiner = document.getElementById("pdf_content");

const btnPdf = document.getElementById('btn_pdf');
const btnExcel = document.getElementById('btn_xlsx');
const btnEdit = document.getElementById('btn_edit');
const btnExpand = document.getElementById('btn_exp');

const gerarPdf = () => {
  pdfConteiner.innerHTML = capaRelatorio;
};
    function baixarPDF() {
        const opt = {
            margin:       0,
            filename:     'relatorio.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(capaRelatorioStylePDF).set(opt).save();
    }

btnPdf.addEventListener("click", () => {
    baixarPDF();
});

document.addEventListener("DOMContentLoaded", () => {
  gerarPdf();
});
