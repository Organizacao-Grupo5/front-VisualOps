const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const jsontoxml = require("jsontoxml");
const XlsxPopulate = require("xlsx-populate");

const relatorioModel = require("../models/relatorioModel")

const gerarRelatorioExcell = async (req, res) => {
  try {
    const infos = req.body;
    const { idMaquina } = req.params;

    const templatePath = path.join(__dirname, "/report/template_visualOps_report.xlsx");

    const dados = await relatorioModel.gerarDadosParaExcel(infos, idMaquina);

    const workbook = await XlsxPopulate.fromFileAsync(templatePath);

    const formatarData = (data) => {
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      const horas = String(data.getHours()).padStart(2, "0");
      const minutos = String(data.getMinutes()).padStart(2, "0");
      return `${ano}/${mes}/${dia} | ${horas}:${minutos}`;
    };

    console.log("DADOS PARA EXCEL: ", dados)

    workbook.sheets().forEach(planilha => {
      if(planilha.name().toLowerCase() !== "storage"){
        planilha.cell('C7').value(`   RELATÓRIO GERAL DOS COMPONENTES DA SUA MÁQUINA - ${(dados[0].nomeUsuario).toUpperCase()} - ${formatarData(new Date())} - Empresa ${(dados[0].nomeEmpresa).toUpperCase()} |`);
    
        const dadosFiltrados = dados.filter(dado => {
          const nomeComponente = dado.componente.toLowerCase();
          const nomePlanilha = planilha.name().toLowerCase();
          return nomeComponente.includes(nomePlanilha) || nomePlanilha.includes(nomeComponente);
        });
  
        dadosFiltrados.forEach((dado, index) => {
          const row = index + 13;
          planilha.cell(`D${row}`).value("" + new Date(dado.dataCaptura).getFullYear() + "/" + (new Date(dado.dataCaptura).getMonth() - 1) + "/" + new Date(dado.dataCaptura).getDate());
          planilha.cell(`F${row}`).value(dado.idCaptura);
          planilha.cell(`H${row}`).value(dado.dadoCaptura);
          planilha.cell(`J${row}`).value(dado.unidadeMedida);
        });
      } else{

        const dadosGPU = dados.filter(dado => {
          return dado.componente.toLowerCase() === "gpu"
        })

        const dadosCPU = dados.filter(dado => {
          return dado.componente.toLowerCase() === "cpu"
        })

        const dadosHDD = dados.filter(dado => {
          return dado.componente.toLowerCase() === "hdd"
        })

        const dadosRAM = dados.filter(dado => {
          return dado.componente.toLowerCase() === "memoriaram"
        })

        const dadosVolume = dados.filter(dado => {
          return dado.componente.toLowerCase() === "volume"
        })

        dadosCPU.forEach((dado, index) => {
          const row = index + 3;
          planilha.cell(`B${row}`).value(dado.dataCaptura);
          planilha.cell(`A${row}`).value(dado.idCaptura);
          planilha.cell(`C${row}`).value(dado.dadoCaptura);
          planilha.cell(`D${row}`).value(dado.unidadeMedida);
        });
        dadosGPU.forEach((dado, index) => {
          const row = index + 3;
          planilha.cell(`Q${row}`).value(dado.dataCaptura);
          planilha.cell(`P${row}`).value(dado.idCaptura);
          planilha.cell(`R${row}`).value(dado.dadoCaptura);
          planilha.cell(`S${row}`).value(dado.unidadeMedida);
        });
        dadosHDD.forEach((dado, index) => {
          const row = index + 3;
          planilha.cell(`G${row}`).value(dado.dataCaptura);
          planilha.cell(`F${row}`).value(dado.idCaptura);
          planilha.cell(`H${row}`).value(dado.dadoCaptura);
          planilha.cell(`I${row}`).value(dado.unidadeMedida);
        });
        dadosRAM.forEach((dado, index) => {
          const row = index + 3;
          planilha.cell(`L${row}`).value(dado.dataCaptura);
          planilha.cell(`K${row}`).value(dado.idCaptura);
          planilha.cell(`M${row}`).value(dado.dadoCaptura);
          planilha.cell(`N${row}`).value(dado.unidadeMedida);
        });
        dadosVolume.forEach((dado, index) => {
          const row = index + 3;
          planilha.cell(`V${row}`).value(dado.dataCaptura);
          planilha.cell(`U${row}`).value(dado.idCaptura);
          planilha.cell(`W${row}`).value(dado.dadoCaptura);
          planilha.cell(`X${row}`).value(dado.unidadeMedida);
        });
      }
    });

    const buffer = await workbook.outputAsync();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.xlsx');

    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar o relatório', details: error.message });
  }
};

module.exports = {
  gerarRelatorioExcell,
};
