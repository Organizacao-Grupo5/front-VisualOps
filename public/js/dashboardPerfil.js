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

document.addEventListener("DOMContentLoaded", async () => {
  const infosUser = await coletaDadosUsuarioLogado();

    inpUserName.value = infosUser[0].nome;
    inpBairro.value = infosUser[0].bairro;
    inpUserEmail.value = infosUser[0].email;
    inpUserPassword.value = infosUser[0].senha;
    inpCEP.value = infosUser[0].cep;
    inpLogradouro.value = infosUser[0].logradouro;
    inpNumero.value = infosUser[0].numero;
    inpEstado.value = infosUser[0].estado;
    inpComplemento.value = infosUser[0].complemento;
    selectCargo.value = infosUser[0].cargo == "Gerente" ? "1" : "2";

  let tableContact = new Tabulator(
    document.getElementById("tabulator_contato"),
    {
      layout: "fitColumns",
      data: [
        { id: 1, telefone: "123-456-7890", tipo: "Celular" },
        { id: 2, telefone: "098-765-4321", tipo: "Trabalho" },
        { id: 3, telefone: "555-555-5555", tipo: "Casa" },
      ],
      columns: [
        { title: "id", field: "id", resizable: false },
        {
          title: "Número",
          field: "telefone",
          editor: "input",
          resizable: false,
        },
        {
          title: "Tipo contato",
          field: "tipo",
          hozAlign: "center",
          editor: "input",
          resizable: false,
        },
        {
          title: "Excluir",
          field: "delete",
          hozAlign: "center",
          formatter: () => "<button>Excluir</button>",
          cellClick: (e, cell) => {
            cell.getRow().delete();
          },
          resizable: false,
        },
        {
          title: "Confirmar",
          field: "confirm",
          hozAlign: "center",
          formatter: () => "<button>Confirmar</button>",
          cellClick: (e, cell) => {
            const rowData = cell.getRow().getData();
            console.log("Dados confirmados:", rowData);
          },
          resizable: false,
        },
        {
          title: "Resetar",
          field: "reset",
          hozAlign: "center",
          formatter: () => "<button>Resetar</button>",
          cellClick: (e, cell) => {
            const row = cell.getRow();
            row.update({ telefone: "", tipo: "" });
            console.log("Linha resetada");
          },
          resizable: false,
        },
      ],
    }
  );

  btnAddRowContact.addEventListener("click", () => {
    tableContact.addRow({}, true);
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
