let express = require("express");
const multer = require("multer");
let router = express.Router();
let path = require("path");
let fs = require("fs");

let dashboardUserController = require("../controllers/dashboardUserController")

router.post("/porcentagemUso", function (req, res) {
  dashboardUserController.porcentagemUso(req, res);
});

router.post("/desempenho", function (req, res) {
  dashboardUserController.desempenho(req, res);
});

router.post("/historicoDesempenho", function (req, res) {
  dashboardUserController.historicoDesempenho(req, res);
});


module.exports = router;
