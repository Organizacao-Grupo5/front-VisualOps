var express = require("express");
var router = express.Router();

var planoController = require("../controllers/planoController");

router.get("//:idUsuario", function (req, res) {
    planoController.listarLivro(req, res);
});

module.exports = router;