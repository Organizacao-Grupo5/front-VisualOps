const btnSave = document.querySelector(".btn.save");

const modal = document.getElementById("deleteModal");
const closeBtn = document.querySelector(".close-1");
const closeModalConfirmaAcao = document.querySelector(".close-2");
const passwordFormExcluir = document.getElementById("passwordForm_excluir");
const passwordFormConfirm = document.getElementById("passwordForm_confirmar");

const modalConfirmarAcao = document.getElementById("confirmModal");
const camposFaltantes = document.getElementById("missing_fields");

let ipv4_1 = document.getElementById("ipv4_1");
let nome_local_ipv4_1 = document.getElementById("nome_local_ipv4_1");

let ipv4_2 = document.getElementById("ipv4_2");
let nome_local_ipv4_2 = document.getElementById("nome_local_ipv4_2");

let marca = document.getElementById("marca");
let numeroPatrimonio = document.getElementById("numero_patrimonio");
let modelo = document.getElementById("modelo");
let responsavel = document.getElementById("responsavel");

async function fetchMaquinas() {
  try {
    const response = await fetch(
      `/maquina/listarMaquina/${sessionStorage.getItem("fkEmpresa")}`,
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

    return await response.json();
  } catch (error) {
    console.log("Ocorreu um erro ao buscar as máquinas: " + error);
    return [];
  }
}

function generateMaquinaHtml(maquina) {
  let ipv4Info = "";

  for (let i = 0; i < Math.min(maquina.numeroIP.length, 2); i++) {
    ipv4Info += `IPV4(${i + 1}): ${maquina.numeroIP[i]} (${
      maquina.nomeLocal[i]
    })<br>`;
  }

  return `
    <div class="maquina-card">
      <i class="fa-solid fa-computer"></i>
      <div class="info-pc">
        <h6>${ipv4Info}Marca: ${maquina.marca}<br>Modelo: ${
    maquina.modelo
  }<br>Responsável: ${maquina.nome}<br>N° Patrimônio: ${
    maquina.numeroIdentificacao
  }</h6>
      </div>
      <button class="garbage" onclick='openModal(${JSON.stringify(maquina)})'>
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <button class="pencil" onclick='editarMaquina(${JSON.stringify(
        maquina
      )})'>
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
    </div>
  `;
}

function addMaquinasToDOM(maquinas) {
  const maquinasHtml = maquinas.map(generateMaquinaHtml).join("");
  const showMaquina = document.getElementById("show_maquinas");
  showMaquina.innerHTML = maquinasHtml;
}

document.addEventListener("DOMContentLoaded", async () => {
  const maquinas = await fetchMaquinas();
  addMaquinasToDOM(maquinas);
});

const inputResponsavel = document.getElementById("responsavel");
const listaUsuarios = document.getElementById("usuarios-lista");
let usuarios = [];

inputResponsavel.addEventListener("input", async () => {
  const termoBusca = inputResponsavel.value.toLowerCase();
  try {
    const resp = await fetch("/maquina/buscarFuncionarios", {
      method: "POST",
      body: JSON.stringify({
        info: {
          campo: termoBusca,
          idEmpresa: sessionStorage.getItem("fkEmpresa"),
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.ok) {
      const dados = await resp.json();
      mostrarUsuariosFiltrados(dados);
    } else {
      throw new Error("Erro ao obter dados");
    }
  } catch (erro) {
    console.error(erro);
  }
  inputResponsavel.value = "";
});

const salvar = async (situacao, senha) => {
  if (!usuarios.idUsuario && situacao.toLowerCase() == "cadastro") {
    console.error("Usuário responsável não encontrado");
    return;
  }

  let campos = {
    infos: {
      marca: marca.value,
      modelo: modelo.value,
      fkUsuario:
        situacao.toLowerCase() == "cadastro"
          ? usuarios.idUsuario
          : maquinaEditar.idUsuario,
      numeroIP1: ipv4_1.value,
      nomeLocal1: nome_local_ipv4_1.value,
      numeroIP2: ipv4_2.value,
      nomeLocal2: nome_local_ipv4_2.value,
      patrimonio: numeroPatrimonio.value,
      senhaUsuario: senha,
      idEmpresa:
        situacao.toLowerCase() == "cadastro"
          ? usuarios.fkEmpresa
          : maquinaEditar.idEmpresa,
      idUsuarioLogado: sessionStorage.getItem("idUsuario"),
      idIpv41:
        situacao.toLowerCase() !== "cadastro" ? maquinaEditar.idIpv4[0] : "",
      idIpv42:
        situacao.toLowerCase() !== "cadastro" ? maquinaEditar.idIpv4[1] : "",
    },
  };

  if (situacao.toLowerCase() == "cadastro") {
    fetch("/maquina/salvar", {
      method: "POST",
      body: JSON.stringify(campos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Erro ao salvar os dados");
        }
      })
      .then(async (data) => {
        console.log("Cadastro realizado:", data);
        const maquinas = await fetchMaquinas();
        addMaquinasToDOM(maquinas);
        closeModalConfirma();
      })
      .catch((error) => {
        document.getElementById("password_confirm").value = "";
        document.getElementById("password_confirm").style.border = "2px solid red"
        document.getElementById("password_confirm").placeholder = "Senha incorreta"
        throw new Error("Erro ao realizar o cadastro:", error);
      });
  } else if (situacao.toLowerCase() == "edição") {
    fetch(`/maquina/editar/${maquinaEditar.idMaquina}`, {
      method: "PUT",
      body: JSON.stringify(campos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Erro ao editar os dados");
        }
      })
      .then(async (data) => {
        console.log("Edição realizada:", data);
        const maquinas = await fetchMaquinas();
        addMaquinasToDOM(maquinas);
        closeModalConfirma();
      })
      .catch((error) => {
        document.getElementById("password_confirm").value = "";
        document.getElementById("password_confirm").style.border = "2px solid red"
        document.getElementById("password_confirm").placeholder = "Senha incorreta"
        throw new Error("Erro ao realizar a edição:", error);
      });
  }
};

passwordFormConfirm.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password_confirm").value;
  const situacao = situacaoFormulario.innerText;
  salvar(situacao, password);
});

function mostrarUsuariosFiltrados(usuariosFiltrados) {
  listaUsuarios.innerHTML = "";
  usuariosFiltrados.map((usuario) => {
    const itemLista = document.createElement("li");
    itemLista.textContent = usuario.nome;
    itemLista.addEventListener("click", function () {
      usuarios = usuario;
      inputResponsavel.value = usuario.nome;
      listaUsuarios.innerHTML = "";
    });
    listaUsuarios.appendChild(itemLista);
  });

  const inputBounds = inputResponsavel.getBoundingClientRect();
  listaUsuarios.style.top = inputBounds.top - listaUsuarios.offsetHeight + "px";
  listaUsuarios.style.left = inputBounds.left + "px";
}

inputResponsavel.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    listaUsuarios.innerHTML = "";
  }
});
let situacaoFormulario = document.getElementById("situacao_formulario");

let maquinaEditar = [];
const editarMaquina = (maquina) => {
  situacaoFormulario.innerText = "EDIÇÃO";
  document.getElementById("btn_vlt").style.display = "flex";
  if (maquina.idIpv4.length > 0) {
    ipv4_1.value = maquina.numeroIP[0];
    nome_local_ipv4_1.value = maquina.nomeLocal[0];
  }
  if (maquina.idIpv4.length > 1) {
    ipv4_2.value = maquina.numeroIP[1];
    nome_local_ipv4_2.value = maquina.nomeLocal[1];
  }
  marca.value = maquina.marca;
  modelo.value = maquina.modelo;
  responsavel.value = maquina.nome;
  numeroPatrimonio.value = maquina.numeroIdentificacao;

  maquinaEditar = maquina;
};

const voltarCadastro = () => {
  situacaoFormulario.innerText = "CADASTRO";
  document.getElementById("btn_vlt").style.display = "none";
  resetFormulario();
};

async function getIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    document.getElementById("ipv4_1").value = data.ip;
  } catch (error) {
    document.getElementById("ipv4_1").value = "Erro ao obter o IP";
    console.error("Erro:", error);
  }
}

document
  .getElementById("autoFillSwitch")
  .addEventListener("change", function () {
    const ipv4Input = document.getElementById("ipv4_1");
    if (this.checked) {
      getIP();
    } else {
      ipv4Input.value = "";
    }
  });

function openModalConfirmarAcao() {
  modalConfirmarAcao.style.display = "block";
}

let maquinaDeletar = "";
function openModal(maquina) {
  modal.style.display = "block";
  maquinaDeletar = maquina;
}

function closeModal() {
  modal.style.display = "none";
}

function closeModalConfirma() {
  modalConfirmarAcao.style.display = "none";
}

closeBtn.addEventListener("click", () => {
  closeModal();
});

closeModalConfirmaAcao.addEventListener("click", () => {
  closeModalConfirma();
});

passwordFormExcluir.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;

  document.getElementById("password").classList.remove("invalid-field");

  fetch(`/maquina/deletar/${maquinaDeletar.idMaquina}`, {
    method: "DELETE",
    body: JSON.stringify({
      info: {
        idUsuario: sessionStorage.getItem("idUsuario"),
        senhaUsuario: password,
        idEmpresa: sessionStorage.getItem("fkEmpresa"),
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (resp) => {
      if (resp.ok) {
        console.log("Máquina deletada com SUCESSO!");
        const maquinas = await fetchMaquinas();
        addMaquinasToDOM(maquinas);
        closeModal();
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

btnSave.addEventListener("click", () => {
  let missingFields = [];

  ipv4_1.classList.remove("invalid-field");
  nome_local_ipv4_1.classList.remove("invalid-field");
  ipv4_2.classList.remove("invalid-field");
  nome_local_ipv4_2.classList.remove("invalid-field");

  if (ipv4_1.value.trim() === "" && ipv4_2.value.trim() === "") {
    ipv4_1.classList.add("invalid-field");
    ipv4_2.classList.add("invalid-field");
    return;
  }

  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4_1.value.trim() && !ipv4Regex.test(ipv4_1.value)) {
    ipv4_1.classList.add("invalid-field");
    return;
  }
  if (ipv4_2.value.trim() && !ipv4Regex.test(ipv4_2.value)) {
    ipv4_2.classList.add("invalid-field");
    return;
  }

  if (ipv4_1.value.trim() && nome_local_ipv4_1.value.trim() === "") {
    nome_local_ipv4_1.classList.add("invalid-field");
    return;
  }
  if (ipv4_2.value.trim() && nome_local_ipv4_2.value.trim() === "") {
    nome_local_ipv4_2.classList.add("invalid-field");
    return;
  }

  if (modelo.value === "") {
    missingFields.push("Modelo");
  }
  if (responsavel.value === "") {
    missingFields.push("Responsável");
  }
  if (marca.value === "") {
    missingFields.push("Marca");
  }
  if (numeroPatrimonio === "") {
    missingFields.push("N° patrimônio");
  }

  if (missingFields.length !== 0) {
    camposFaltantes.innerHTML = `
    <h3>Existem campos que não foram preenchidos (Poderão ser preenchidos posteriormente)</h3>
        <ul>
            ${missingFields.map((campo) => `<li>${campo}</li>`).join("")}
        </ul>
      <p>Consequências de não preencher os campos obrigatórios:</p>
      <ul>
        <li>Incompletude dos dados: A falta desses campos pode resultar em registros incompletos, o que pode dificultar a compreensão ou análise das informações posteriormente.</li>
        <li>Perda de contexto: Sem esses detalhes importantes, pode ser difícil entender completamente o contexto ou a finalidade dos registros.</li>
        <li>Impacto na funcionalidade: Dependendo do sistema ou do uso dos dados, a falta desses campos pode impactar a funcionalidade ou a capacidade do sistema de realizar determinadas operações.</li>
        <li>Dificuldade na identificação: A ausência de informações como modelo, marca e responsável pode tornar difícil identificar ou rastrear o dispositivo ou recurso correspondente.</li>
      </ul>`;
  }

  openModalConfirmarAcao();
});

function showPopup(fields) {
  var popup = document.getElementById("popup");
  var missingFieldsList = document.getElementById("missing-fields");
  missingFieldsList.innerHTML = "";

  for (var i = 0; i < fields.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = fields[i];
    missingFieldsList.appendChild(listItem);
  }

  popup.style.display = "block";
}

function closePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}

const btnReset = document.querySelector(".btn.reset");

const resetFormulario = () => {
  ipv4_1.value = "";
  nome_local_ipv4_1.value = "";
  ipv4_2.value = "";
  nome_local_ipv4_2.value = "";
  marca.value = "";
  modelo.value = "";
  responsavel.value = "";
  numeroPatrimonio.value = "";

  ipv4_1.classList.remove("invalid-field");
  nome_local_ipv4_1.classList.remove("invalid-field");
  ipv4_2.classList.remove("invalid-field");
  nome_local_ipv4_2.classList.remove("invalid-field");
};

btnReset.addEventListener("click", () => {
  resetFormulario();
});

const abrirTutorialIP = () => {
  document.getElementById("ipv4Popup").style.display = "flex";
};

document
  .getElementById("closeIPv4Popup")
  .addEventListener("click", function () {
    document.getElementById("ipv4Popup").style.display = "none";
  });

window.onclick = function (event) {
  if (event.target == document.getElementById("ipv4Popup")) {
    document.getElementById("ipv4Popup").style.display = "none";
  }
};
