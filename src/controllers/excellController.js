const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const jsontoxml = require("jsontoxml");

const gerarRelatorioExcell = async (req, res) => {
  const templatePath = path.join(
    __dirname,
    "/report/template_visualOps_report.xlsx"
  );
  const dado = req.body.dado;
  console.log(dado);

};

module.exports = {
  gerarRelatorioExcell,
};
