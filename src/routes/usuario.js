let express = require("express");
const multer = require("multer");
let router = express.Router();
let path = require("path");
let fs = require("fs");

let usuarioController = require("../controllers/usuarioController");
let perfilController = require("../controllers/perfilController");

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

router.get("/listar/:id", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/infoUsuario/:idUsuario", (req, res) => {
  return perfilController.buscarInfosUsuario(req, res);
});

router.get("/infoContatosUsuario/:idUsuario", (req, res) => {
  return perfilController.buscarInfosContatosUsuario(req, res);
});

router.put("/atualiza/:idUsuario", (req, res) => {
  return perfilController.atualizaInfosUsuario(req, res);
});

router.post("/contato/:idUsuario", (req, res) => {
  return perfilController.createContact(req, res);
});

router.put("/contato/:idContato", (req, res) => {
  return perfilController.updateContact(req, res);
});

router.delete("/contato/:idContato", (req, res) => {
  return perfilController.deleteContact(req, res);
});

router.put("/endereco/:idEndereco", (req, res) => {
    return perfilController.updateEndereco(req, res);
});

module.exports = router;
