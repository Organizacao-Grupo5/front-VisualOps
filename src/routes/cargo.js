var express = require("express");
var router = express.Router();

var cargoController = require("../controllers/cargoController");

router.post("/criar", function (req, res) {
    cargoController.criar(req, res);
});

router.get("/selecionar/:nomeCargo", function (req, res) {
    cargoController.selecionar(req, res);
});

module.exports = router;