const { Router } = require("express");
const router = Router();

const queriesController = require("../controllers/queriesController");

router.get("/listar/:tabela", (req, res) => {
    queriesController.listar(req, res);
});

module.exports = router;
