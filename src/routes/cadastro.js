var express = require("express");
var router = express.Router();

var cadastroController = require("../controllers/cadastroController");

router.post("/cadastrar", function (req, res) {
    cadastroController.cadastrar(req, res);
});

module.exports = router;