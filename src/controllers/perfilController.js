const perfilModel = require("../models/perfilModel");

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

module.exports = {
  buscarInfosUsuario,
};
