const perfilModel = require("../models/perfilModel");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const tempDir = path.join(__dirname, "../tmp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const buscarInfosUsuario = async (req, res) => {
  const idUser = req.params.idUsuario;
  console.log("Preferências:\n", idUser);
  await perfilModel
    .selecionaUsuarioLogado(idUser)
    .then((resp) => {
      return res.json(resp);
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
};

const buscarInfosContatosUsuario = async (req, res) => {
  const idUser = req.params.idUsuario;
  console.log("Preferências:\n", idUser);
  await perfilModel
    .selecionaContatosUsuarioLogado(idUser)
    .then((resp) => {
      return res.json(resp);
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("image");

const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Falha no upload da imagem." });
    }
    res.json({ message: "Imagem salva com sucesso!", file: req.file });
  });
};

const atualizaInfosUsuario = (req, res) => {
  const idUsuario = req.params.idUsuario;
  const infos = req.body;

  perfilModel
    .atualizaInfosUsuario(idUsuario, infos)
    .then((resp) => {
      res.json(resp);
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
};

const createContact = async (req, res) => {
  try {
    const infos = req.body;
    const idUsuario = req.params.idUsuario;

    await perfilModel.criaContato(idUsuario, infos);

    res.status(201).json({ message: "Contato criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar um novo contato:", error);
    res.status(500).json({ error: "Erro ao criar um novo contato" });
  }
};

const updateContact = async (req, res) => {
  try {
    const id = req.params.idContato;
    const infos = req.body;

    await perfilModel.atualizaContato(id, infos);

    res.json({ message: "Contato atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o contato:", error);
    res.status(500).json({ error: "Erro ao atualizar o contato" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const idContato = req.params.idContato;

    await perfilModel.deleteContact(idContato);

    res.json({ message: "Contato excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o contato:", error);
    res.status(500).json({ error: "Erro ao excluir o contato" });
  }
};

const updateEndereco = async (req, res) => {
  try {
    const id = req.params.idEndereco;
    const infos = req.body;

    await perfilModel.updateEndereco(id, infos);

    res.json({ message: "Endereço atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o endereço:", error);
    res.status(500).json({ error: "Erro ao atualizar o endereço" });
  }
};

module.exports = {
  uploadImage,
  buscarInfosUsuario,
  buscarInfosContatosUsuario,
  atualizaInfosUsuario,
  createContact,
  updateContact,
  deleteContact,
  updateEndereco,
};
