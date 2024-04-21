var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

<<<<<<< HEAD
module.exports = { router };
=======
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;
>>>>>>> ad191f8d53f94f0a96ae5cd76b9589b1826f1441
