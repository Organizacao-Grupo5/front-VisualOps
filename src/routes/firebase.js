const express = require("express");
const multer = require("multer");
const firebaseController = require("../controllers/firebaseController");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 },
});

router.post("/upload", upload.single("imagem"), async (req, res) => {
  const nomeArquivo = req.file.originalname;
  const buffer = req.file.buffer;
  const contentType = req.file.mimetype;
  const diretorioNoStorage = "empresa";

  const sucesso = await firebaseController.enviarImagemParaFirebaseStorage(
    nomeArquivo,
    buffer,
    diretorioNoStorage,
    contentType
  );

  if (sucesso) {
    res.status(200).send("Imagem enviada com sucesso para o Firebase Storage.");
  } else {
    res.status(500).send("Erro ao enviar a imagem para o Firebase Storage.");
  }
});

module.exports = router;
