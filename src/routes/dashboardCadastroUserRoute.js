let express = require("express");
const multer = require("multer");
let router = express.Router();
let path = require("path");
let fs = require("fs");

let dashboardCadastroUser = require("../controllers/dashboardCadastroUserController")

router.post("/carregarInfosFuncionario", function (req, res) {
  dashboardCadastroUser.carregarInfosFuncionario(req, res);
});

router.post("/salvarInfosFuncionario", function (req, res) {
  dashboardCadastroUser.salvarInfosFuncionario(req, res);
});

router.post("/carregarTodosFuncionarios", function (req, res) {
  dashboardCadastroUser.carregarTodosFuncionarios(req, res);
});

router.post("/criarFuncionario", function (req, res) {
  dashboardCadastroUser.criarFuncionario(req, res);
});

router.post("/excluirFuncionario", function (req, res) {
  dashboardCadastroUser.excluirFuncionario(req, res);
});



module.exports = router;
