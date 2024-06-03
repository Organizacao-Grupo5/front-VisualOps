const btnAddRowContact = document.getElementById("addButton");

const inpUserName = document.getElementById("inp_user_name");
const inpUserEmail = document.getElementById("inp_user_email");
const inpUserPassword = document.getElementById("inp_user_password");
const selectCargo = document.getElementById("select_cargo");

const inpCEP = document.getElementById("inp_cep");
const inpLogradouro = document.getElementById("inp_logradouro");
const inpNumero = document.getElementById("inp_numero");
const inpBairro = document.getElementById("inp_bairro");
const inpEstado = document.getElementById("inp_estado");
const inpComplemento = document.getElementById("inp_complemento");

const btnSalvar = document.getElementById("btn_save");
const btnResetar = document.getElementById("btn_reset");

const alterarIMG = document.getElementById("alt_img");
const ficheiro = document.getElementById("fileInput");

let dadosOriginais = null;

let selectedImage = null;

ficheiro.addEventListener("change", (event) => {
  selectedImage = event.target.files[0];
  if (selectedImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(".user-img img").src = e.target.result;
    };
    reader.readAsDataURL(selectedImage);
  } else {
    fileNameElement.textContent = "Nenhum ficheiro selecionado";
  }
});

const createUsuarioObject = () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);
  const imgUser = file ? file.name : "";

  return {
    nome: inpUserName.value,
    email: inpUserEmail.value,
    senha: inpUserPassword.value,
    cargo: selectCargo.value,
    imgUser: imgUser,
    file: formData,
  };
};

const createEnderecoObject = () => {
  return {
    cep: inpCEP.value,
    estado: inpEstado.value,
    bairro: inpBairro.value,
    complemento: inpComplemento.value,
    logradouro: inpLogradouro.value,
    numero: inpNumero.value,
  };
};

document.addEventListener("DOMContentLoaded", async () => {
  const infosUser = await coletaDadosUsuarioLogado();

  dadosOriginais = infosUser;

  inpUserName.value = infosUser[0].nome;
  inpBairro.value = infosUser[0].bairro;
  inpUserEmail.value = infosUser[0].email;
  inpUserPassword.value = infosUser[0].senha;
  inpCEP.value = infosUser[0].cep;
  inpLogradouro.value = infosUser[0].logradouro;
  inpNumero.value = infosUser[0].numero;
  inpEstado.value = infosUser[0].estado;
  inpComplemento.value = infosUser[0].complemento;
  selectCargo.value = infosUser[0].cargo == "Gerente" ? "Gerente" : "Designer";

  let originalData = [];

  let tableContact = new Tabulator(
    document.getElementById("tabulator_contato"),
    {
      layout: "fitColumns",
      data: await coletaDadosContatosUsuarioLogado(),
      columns: [
        { title: "id", field: "idContato", resizable: false },
        {
          title: "Número",
          field: "telefone",
          editor: "input",
          resizable: false,
          cellEdited: function (cell) {
            enableConfirmButton(cell.getRow());
          },
        },
        {
          title: "Tipo contato",
          field: "tipo",
          hozAlign: "center",
          editor: "input",
          resizable: false,
          cellEdited: function (cell) {
            enableConfirmButton(cell.getRow());
          },
        },
        {
          title: "Excluir",
          field: "delete",
          hozAlign: "center",
          formatter: () => "<button>Excluir</button>",
          cellClick: (e, cell) => {
            cell.getRow().delete();
            deleteContact(cell.getRow().getData().idContato);
          },
          resizable: false,
        },
        {
          title: "Confirmar",
          field: "confirm",
          hozAlign: "center",
          formatter: () => "<button disabled>Confirmar</button>",
          cellClick: (e, cell) => {
            const rowData = cell.getRow().getData();
            if (!rowData.idContato) {
              createContact(rowData);
            } else {
              updateContact(rowData);
            }
            disableConfirmButton(cell.getRow());
          },
          resizable: false,
        },
      ],
      dataLoaded: function (data) {
        originalData = data.map((obj) => ({ ...obj }));
      },
    }
  );

  function enableConfirmButton(row) {
    row
      .getCell("confirm")
      .getElement()
      .querySelector("button")
      .removeAttribute("disabled");
  }

  function disableConfirmButton(row) {
    row
      .getCell("confirm")
      .getElement()
      .querySelector("button")
      .setAttribute("disabled", "disabled");
  }

  btnAddRowContact.addEventListener("click", () => {
    tableContact.addRow({}, true);
  });

  alterarIMG.addEventListener("click", () => {
    ficheiro.click();
  });
});

const coletaDadosUsuarioLogado = async () => {
  try {
    const response = await fetch(
      `/usuario/infoUsuario/${sessionStorage.getItem("idUsuario")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro na resposta");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao coletar dados do usuário:", error);
    throw error;
  }
};

const coletaDadosContatosUsuarioLogado = async () => {
  try {
    const response = await fetch(
      `/usuario/infoContatosUsuario/${sessionStorage.getItem("idUsuario")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro na resposta");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao coletar dados do usuário:", error);
    throw error;
  }
};

let nomeArquivo = "";
let usuario = "";
const atualizaUsuario = async () => {
  usuario = createUsuarioObject();

  if (usuario.imgUser) {
    let fileName = usuario.imgUser;
    const fileExtension = fileName.split(".").pop();

    if (fileName.length > 30) {
      const extensionLength = fileExtension.length + 1;
      const maxFileNameLength = 30 - extensionLength;
      const truncatedFileName =
        fileName.substring(0, maxFileNameLength) + "." + fileExtension;

      fileName = truncatedFileName;
      nomeArquivo = fileName;
    }

    fileName = `empresa/${fileName}`;

    usuario.imgUser = fileName;
  }

  fetch(`/usuario/atualiza/${sessionStorage.getItem("idUsuario")}`, {
    method: "PUT",
    body: JSON.stringify(usuario),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao atualizar o usuário");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Usuário atualizado com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
  const inputImagem = document.getElementById("fileInput");
  const imagem = inputImagem.files[0];

  if (!imagem) {
    alert("Por favor, selecione uma imagem.");
    return;
  }

  const formData = new FormData();
  formData.append("imagem", imagem);

  try {
    const response = await fetch("/firebase/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Imagem enviada com sucesso para o Firebase Storage.");
    } else {
      throw new Error("Erro ao enviar a imagem para o Firebase Storage.");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao enviar a imagem. Por favor, tente novamente.");
  }
};

const atualizaEndereco = () => {
  const endereco = createEnderecoObject();

  fetch(`/usuario/endereco/${sessionStorage.getItem("fkEmpresa")}`, {
    method: "PUT",
    body: JSON.stringify(endereco),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao atualizar o endereço");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Endereço atualizado com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
};

document.getElementById("btn_save").addEventListener("click", () => {
  atualizaUsuario();
  atualizaEndereco();
});

const createContact = (contactData) => {
  fetch(`/usuario/contato/${sessionStorage.getItem("idUsuario")}`, {
    method: "POST",
    body: JSON.stringify(contactData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao criar um novo contato");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Novo contato criado com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
};

const updateContact = (contactData) => {
  fetch(`/usuario/contato/${contactData.idContato}`, {
    method: "PUT",
    body: JSON.stringify(contactData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao atualizar o contato");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Contato atualizado com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
};

const deleteContact = (idContato) => {
  fetch(`/usuario/contato/${idContato}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao excluir o contato");
      }
      console.log("Contato excluído com sucesso");
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
};
