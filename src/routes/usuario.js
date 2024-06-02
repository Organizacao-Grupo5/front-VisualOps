let express = require("express");
let router = express.Router();

let usuarioController = require("../controllers/usuarioController");
let perfilController = require("../controllers/perfilController")

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/infoUsuario/:idUsuario", (req, res) => {
    return perfilController.buscarInfosUsuario(req, res);
})

module.exports = router;