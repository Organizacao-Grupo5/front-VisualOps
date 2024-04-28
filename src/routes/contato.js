const express = require("express");
const router = express.Router();

const contatoController = require("../controllers/contatoController");

router.post("/cadastrar", function (req, res) {
    contatoController.cadastrar(req, res);
});

module.exports = router;