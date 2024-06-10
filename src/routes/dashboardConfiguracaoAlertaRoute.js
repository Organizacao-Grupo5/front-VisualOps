let express = require("express");
const multer = require("multer");
let router = express.Router();
let path = require("path");
let fs = require("fs");

let dashboardConfiguracaoAlerta = require("../controllers/dashboardConfiguracaoAlertaController")

router.post("/carregarInfosMaquina", function (req, res) {
  dashboardConfiguracaoAlerta.carregarInfosMaquina(req, res);
});

router.post("/carregarInfosComponente", function (req, res) {
  dashboardConfiguracaoAlerta.carregarInfosComponente(req, res);
});

router.post("/salvarAlertaCritico", function (req, res) {
  dashboardConfiguracaoAlerta.salvarAlertaCritico(req, res);
});

router.post("/carregaridComponente", function (req, res) {
  dashboardConfiguracaoAlerta.carregaridComponente(req, res);
});




module.exports = router;
