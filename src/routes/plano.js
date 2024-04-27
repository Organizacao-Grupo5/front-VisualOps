var express = require("express");
var router = express.Router();

var planoController = require("../controllers/planoController");

router.get("/selecionar", function (req, res) {
    planoController.selecionarPlano(req, res);
});

module.exports = router;