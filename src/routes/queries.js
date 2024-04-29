const { Router } = require("express");
const router = Router();

const queriesController = require("../controllers/queriesController");

router.post("/listar/:tabela", (req, res) => {
    queriesController.listar(req, res);
});

router.delete("/deletar/:tabela", (req, res) => {
    queriesController.deletar(req, res);
});

module.exports = router;
