function windowDashboardOwner() {
  window.location = "dashboardOwner.html";
}

function windowDashboardGerente() {
  window.location = "dashboardGerente.html";
}

function windowDashboardPessoal() {
  window.location = "dashboardUser.html";
}

function windowPerfil() {
  window.location = "dashboardPerfil.html";
}

function windowCadastroUser() {
  window.location = "dashboardCadastroUser.html";
}

function windowSair() {
  window.location = "../index.html";
}

function windowLogin() {
  window.location = "login.html";
}

function entrarDash() {
  window.location = "acesso/dashboardOwner.html";
}

function entrarPerfil() {
  window.location = "acesso/dashboardPerfil.html";
}

function windowRelatorio() {
  window.location = "dashboardRelatorio.html";
}

function windowMaquina() {
  window.location = "dashboardMaquinas.html";
}

function windowSuporte(){
  window.location = "dashboardSuporte.html"
}

function windowPlanos(){
  window.location = `dashboardPlanos.html`;
}

let checkbox = document.getElementById("activate_alerts");

function adicionarImagemNoCirculo(imagemSrc) {
  const circleElement = document.querySelector(".circle");
  if (circleElement) {
    const imgElement = document.createElement("img");
    imgElement.src = imagemSrc;
    circleElement.appendChild(imgElement);
  }
}

async function carregarImagemPerfil(caminhoImagem) {
  try {
    const response = await fetch("/firebase/imagem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ caminho: caminhoImagem }),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar a imagem.");
    }

    const blob = await response.blob();
    const imagemURL = URL.createObjectURL(blob);

    adicionarImagemNoCirculo(imagemURL);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  checkbox = document.getElementById("activate_alerts");

  
  const isChecked = sessionStorage.getItem("checkboxState") === "true";
  checkbox.checked = isChecked

  carregarImagemPerfil(sessionStorage.getItem("caminhoIMG"));

  verificarAlerta()
  updateMessageCount();
  setInterval(() => {
    verificarAlerta();
    updateMessageCount();
  }, 5000);

  document.getElementById("loadMoreBtn").addEventListener("click", () => {
    carregarMaisCapturas();
  });
});

let messagesArray = [];
let offset = 0;
let limit = 10;

const carregarMaisCapturas = async () => {
  try {

    const lastId = messagesArray.length > 0 ? messagesArray[messagesArray.length - 1].id : Number.MAX_SAFE_INTEGER;

    const response = await fetch(
      `/usuario/alerta/carregar`,
      {
        method: "POST",
        body: JSON.stringify({
          idUsuario: sessionStorage.getItem("idUsuario"), 
          ultimoId: lastId
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar registros de alerta: ${response.statusText}`
      );
    }

    dados = await response.json();

    const novosAlertas = dados.filter(
      (alert) =>
        !messagesArray.some((msg) => msg.id === alert.idRegistroAlertas)
    );

    messagesArray = [
      ...messagesArray,
      ...novosAlertas.map((alert) => ({
        id: alert.idRegistroAlertas,
        tipoAlerta: alert.tipoAlerta,
        mensagem: alert.mensagem,
        dataCaptura: alert.horario,
        marca: alert.marca,
        modelo: alert.modelo,
        componente: alert.componente,
        idCaptura: alert.fkCaptura,
      })),
    ];

    updateMessageCount();
    showMessages();
  } catch (error) {
    console.error("Erro ao verificar alerta:", error);
  }
}

const verificarAlerta = async () => {
  try {
    let dados = [];

    const response = await fetch(
      `/usuario/alerta/${sessionStorage.getItem("idUsuario")}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar registros de alerta: ${response.statusText}`
      );
    }

    dados = await response.json();

    const novosAlertas = dados.filter(
      (alert) =>
        !messagesArray.some((msg) => msg.id === alert.idRegistroAlertas)
    );

    messagesArray = [
      ...messagesArray,
      ...novosAlertas.map((alert) => ({
        id: alert.idRegistroAlertas,
        tipoAlerta: alert.tipoAlerta,
        mensagem: alert.mensagem,
        dataCaptura: alert.horario,
        marca: alert.marca,
        modelo: alert.modelo,
        componente: alert.componente,
        idCaptura: alert.fkCaptura,
      })),
    ];

    updateMessageCount();
    showMessages();

  } catch (error) {
    console.error("Erro ao verificar alerta:", error);
  }

  console.log("Novos dados");

  if (sessionStorage.getItem("alertaAtivado") === "true") {
    let dados = [];

    const response = await fetch(
      `/usuario/alerta/${sessionStorage.getItem("idUsuario")}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    dados = await response.json();

    console.log("Mensagem dados: " + dados)

    let alertPopUp = document.getElementById("popUp_alert");
    let alertDiv = document.getElementById("alert");
    if(!alertPopUp){
      criaAlerta();
      alertPopUp = document.getElementById("popUp_alert");
      alertDiv = document.getElementById("alert");
    }

    alertPopUp.style.display = "flex";

    dados.map((alert) => {
      let styleClass = "";
      if (alert.tipoAlerta === "BOM") {
        styleClass = "info";
      } else if (alert.tipoAlerta === "MÉDIO") {
        styleClass = "warning";
      } else {
        styleClass = "error";
      }
      alertDiv.innerHTML += `
        <div class="alert ${styleClass}">
          <div class="header-alert">
            <h6>Componente: ${alert.componente}</h6>
            <span>Estado: ${alert.tipoAlerta}</span>
          </div>
          <h6>${alert.mensagem}</h6>
          <div class="alert-content">
            <h6>Dado capturado: ${parseFloat(alert.dadoCaptura).toFixed(2)}</h6>
            <h6>${alert.unidadeMedida}</h6>
            <h6 class="percent-alert">${parseFloat(
              alert.dadoCapturaPercent
            ).toFixed(2)}%</h6>
          </div>
          <h6 class="alert-date">${
            new Date(alert.dataCaptura).getFullYear() +
            "/" +
            (new Date(alert.dataCaptura).getMonth() + 1) +
            "/" +
            new Date(alert.dataCaptura).getDate() +
            " | " +
            new Date(alert.dataCaptura).getHours() +
            ":" +
            new Date(alert.dataCaptura).getMinutes() +
            ":" +
            new Date(alert.dataCaptura).getSeconds()
          }</h6>
        </div>
        `;
    });
  }
};

const criaAlerta = () => {
  const divPopUp = document.createElement("div");
  divPopUp.classList.add("custom-popup");

  const divPopUpContent = document.createElement("div");
  divPopUpContent.classList.add("custom-popup-content");

  divPopUp.appendChild(divPopUpContent);

  const h2Alert = document.createElement("h2");
  h2Alert.innerText = "VERIFICAÇÃO DE ALERTA -";

  divPopUpContent.appendChild(h2Alert);

  const pAlert = document.createElement("p");
  pAlert.innerText = "Análise dos componentes";

  divPopUpContent.appendChild(pAlert);

  const contentAlert = document.createElement("div");
  contentAlert.classList.add("content-alert");
  contentAlert.id = "alert";

  divPopUpContent.appendChild(contentAlert);

  const closeButton = document.createElement("span");
  closeButton.className = "custom-popup-close-btn";
  closeButton.innerHTML = "&times;";

  closeButton.onclick = () => {
    document.body.removeChild(divPopUp);
  };
  divPopUpContent.appendChild(closeButton);

  document.body.appendChild(divPopUp);

  divPopUp.id = "popUp_alert";
};

function showNotification() {
  let notificationWrapper = document.getElementById("notificationWrapper");
  notificationWrapper.style.display = "block";
}

function closeNotification() {
  let notificationWrapper = document.getElementById("notificationWrapper");
  notificationWrapper.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  let notificationButton = document.getElementById("notificationButton");
  notificationButton.addEventListener("click", showNotification);
});

function updateMessageCount() {
  let messageCountNumber = document.getElementById("messageCountNumber");
  let notifyCountNumber = document.getElementById("count_alerts");
  if (messageCountNumber) {
    messageCountNumber.textContent = messagesArray.length;
    notifyCountNumber.textContent = messagesArray.length;
    if (messagesArray.length === 0) {
      notifyCountNumber.style.display = "none";
    } else {
      notifyCountNumber.style.display = "flex";
    }
  }
}

function showMessages() {
  let messageListDiv = document.getElementById("messageList");
  let startIndex = messageListDiv.children.length;

  messagesArray.slice(startIndex).forEach(function (message) {
    let messageCard = document.createElement("div");
    messageCard.classList.add("message-card");

    let messageHeader = document.createElement("div");
    messageHeader.classList.add("message-header");

    let headerText = "Tipo de Alerta: " + message.tipoAlerta;
    messageHeader.textContent = headerText;

    if (message.tipoAlerta === "RUIM") {
      messageHeader.classList.add("ruim");
    } else if (message.tipoAlerta === "MÉDIO") {
      messageHeader.classList.add("medio");
    }

    let messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.textContent = message.mensagem;

    let messageInfo = document.createElement("div");
    messageInfo.classList.add("message-info");

    let messageDate = document.createElement("p");
    messageDate.textContent =
      "Data de Captura: " + formatDateTime(message.dataCaptura);
    messageInfo.appendChild(messageDate);

    let messageComponente = document.createElement("p");
    messageComponente.textContent =
      "Componente: " + message.componente;
    messageInfo.appendChild(messageComponente);

    let messageBrand = document.createElement("p");
    messageBrand.textContent = "Marca: " + message.marca;
    messageInfo.appendChild(messageBrand);

    let messageModel = document.createElement("p");
    messageModel.textContent = "Modelo: " + message.modelo;
    messageInfo.appendChild(messageModel);

    let readButton = document.createElement("button");
    readButton.textContent = "Marcar como Lida";
    readButton.classList.add("read-button");

    let messageId = message.id;

    readButton.addEventListener("click", function () {
      messagesArray = messagesArray.filter(function (message) {
        return message.id !== messageId;
      });

      messageListDiv.removeChild(messageCard);

      fetch(`/usuario/alerta/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCaptura: message.idCaptura,
          idAlerta: message.id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Erro ao marcar mensagem como lida: ${response.statusText}`
            );
          }
          updateMessageCount();
        })
        .catch((error) => {
          console.error("Erro ao marcar mensagem como lida:", error);
        });
    });

    messageCard.appendChild(messageHeader);
    messageCard.appendChild(messageContent);
    messageCard.appendChild(messageInfo);
    messageCard.appendChild(readButton);

    messageListDiv.appendChild(messageCard);
  });

  let messagesDiv = document.getElementById("messages");
  messagesDiv.style.display = "block";
}

function formatDateTime(dateTime) {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date(dateTime).toLocaleString("pt-BR", options);
}

function closeNotification() {
  let notificationWrapper = document.getElementById("notificationWrapper");
  notificationWrapper.style.display = "none";
}

checkbox.addEventListener("change", function () {
  sessionStorage.setItem("alertaAtivado", checkbox.checked);
});

updateMessageCount();
