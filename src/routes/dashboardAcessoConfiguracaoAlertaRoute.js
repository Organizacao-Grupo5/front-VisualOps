let express = require("express");
const multer = require("multer");
let router = express.Router();
let path = require("path");
let fs = require("fs");

let dashboardAcessoConfiguracaoAlerta = require("../controllers/dashboardAcessoConfiguracaoAlertaController")

router.post("/carregarInfosMaquina", function (req, res) {
  dashboardAcessoConfiguracaoAlerta.carregarInfosMaquina(req, res);
});




module.exports = router;
