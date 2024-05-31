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

const modal = document.getElementById("deleteModal");
const closeBtn = document.querySelector(".close-1");
const closeModalConfirmaAcao = document.querySelector(".close-2");
const passwordFormExcluir = document.getElementById("passwordForm_excluir");
const passwordFormConfirm = document.getElementById("passwordForm_confirmar");

const modalConfirmarAcao = document.getElementById("confirmModal");
const camposFaltantes = document.getElementById("missing_fields");

function openModalConfirmarAcao() {
  modalConfirmarAcao.style.display = "block";
}

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function closeModalConfirma() {
  modalConfirmarAcao.style.display = "none";
}

document.querySelectorAll(".garbage").forEach((button) => {
  button.addEventListener("click", () => {
    openModal();
  });
});

closeBtn.addEventListener("click", () => {
  closeModal();
});

closeModalConfirmaAcao.addEventListener("click", () => {
  closeModalConfirma();
});

passwordFormExcluir.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;

  closeModal();
});

passwordFormConfirm.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password_confirm").value;

  closeModalConfirma();
});

const btnSave = document.querySelector(".btn.save");

btnSave.addEventListener("click", () => {
  let ipv4_1 = document.getElementById("ipv4_1");
  let nome_local_ipv4_1 = document.getElementById("nome_local_ipv4_1");

  let ipv4_2 = document.getElementById("ipv4_2");
  let nome_local_ipv4_2 = document.getElementById("nome_local_ipv4_2");

  let marca = document.getElementById("marca");
  let modelo = document.getElementById("modelo");
  let responsavel = document.getElementById("responsavel");

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

btnReset.addEventListener("click", () => {
  let ipv4_1 = document.getElementById("ipv4_1");
  let nome_local_ipv4_1 = document.getElementById("nome_local_ipv4_1");
  let ipv4_2 = document.getElementById("ipv4_2");
  let nome_local_ipv4_2 = document.getElementById("nome_local_ipv4_2");
  let marca = document.getElementById("marca");
  let modelo = document.getElementById("modelo");
  let responsavel = document.getElementById("responsavel");

  ipv4_1.value = "";
  nome_local_ipv4_1.value = "";
  ipv4_2.value = "";
  nome_local_ipv4_2.value = "";
  marca.value = "";
  modelo.value = "";
  responsavel.value = "";

  ipv4_1.classList.remove("invalid-field");
  nome_local_ipv4_1.classList.remove("invalid-field");
  ipv4_2.classList.remove("invalid-field");
  nome_local_ipv4_2.classList.remove("invalid-field");
});
