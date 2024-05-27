const path = require("path");
const XlsxPopulate = require("xlsx-populate");
const relatorioModel = require('../models/relatorioModel');

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

    workbook.sheets().forEach(planilha => {

      planilha.cell('C7').value(`   RELATÓRIO GERAL DOS COMPONENTES DA SUA MÁQUINA - ${(dados[0].nomeUsuario).toUpperCase()} - ${formatarData(new Date())} - Empresa ${(dados[0].nomeEmpresa).toUpperCase()} |`);
  
      const dadosFiltrados = dados.filter(dado => {
        const nomeComponente = dado.componente.toLowerCase();
        const nomePlanilha = planilha.name().toLowerCase();
        return nomeComponente.includes(nomePlanilha) || nomePlanilha.includes(nomeComponente);
      });

      dadosFiltrados.forEach((dado, index) => {
        const row = index + 13;
        planilha.cell(`D${row}`).value(dado.dataCaptura);
        planilha.cell(`F${row}`).value(dado.idCaptura);
        planilha.cell(`H${row}`).value(dado.dadoCaptura);
        planilha.cell(`J${row}`).value(dado.unidadeMedida);
      });
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
