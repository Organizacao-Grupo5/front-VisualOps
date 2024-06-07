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
  window.location = "indexlogado.html";
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

document.addEventListener(
  "DOMContentLoaded",
  carregarImagemPerfil(sessionStorage.getItem("caminhoIMG"))
);