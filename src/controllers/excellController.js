const path = require("path");
const ExcelJS = require("exceljs");
const relatorioModel = require('../models/relatorioModel');

const gerarRelatorioExcell = async (req, res) => {
  try {
    const infos = req.body;
    const { idMaquina } = req.params;

    const templatePath = path.join(__dirname, "/report/template_visualOps_report.xlsx");

    const dados = await relatorioModel.gerarDadosParaExcel(infos, idMaquina);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);

    console.log('Worksheets:', workbook.worksheets.map(ws => ws.name));

    const worksheet = workbook.worksheets[0]; // ou workbook.getWorksheet('NomeDaAba');

    if (!worksheet) {
      throw new Error('Worksheet not found');
    }

    dados.forEach((dado, index) => {
      const row = index + 13; // Começa na linha 13
      worksheet.getCell(`D${row}`).value = dado.dataCaptura;
      worksheet.getCell(`E${row}`).value = dado.dataCaptura;
      worksheet.getCell(`F${row}`).value = dado.idCaptura;
      worksheet.getCell(`G${row}`).value = dado.idCaptura;
      worksheet.getCell(`H${row}`).value = dado.dadoCaptura;
      worksheet.getCell(`I${row}`).value = dado.dadoCaptura;
      worksheet.getCell(`J${row}`).value = dado.unidadeMedida;
      worksheet.getCell(`K${row}`).value = dado.unidadeMedida;
    });

    const buffer = await workbook.xlsx.writeBuffer();

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
