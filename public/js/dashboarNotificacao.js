


carregarInfosMaquina();
async function carregarInfosMaquina() {

var idUsuario = sessionStorage.getItem('idUsuario');
var idMaquina = sessionStorage.getItem('idMaquina');

    fetch(`/dashboardConfiguracaoAlertaRoute/carregarInfosMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            idServer: idUsuario,
            idMaqui: idMaquina
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));


                    const resultadoRequerirDados = json.resultadoRequerirDados;

                    console.log(resultadoRequerirDados)

                    carregarDadosMeio(resultadoRequerirDados);

                });

            } else {
                throw "Houve um erro ao tentar acessar os dados da Dashboard do usuário!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });


    return false;

}

function carregarDadosMeio(dadosRequeridos){

        let dados = dadosRequeridos;
        console.log(dadosRequeridos[0])

        let ipMaquina = document.getElementById("ip_maquina");
        let processador = document.getElementById("processador_maquina");
        let placaVideo = document.getElementById("placa_de_video");
        let disco = document.getElementById("disco_maquina");
        let responsavel = document.getElementById("nome_responsavel");

        ipMaquina.innerHTML = `IP Máquina: ${dadosRequeridos[0].ip_maquina}`;
        processador.innerHTML = `Processador: ${dadosRequeridos[0].modelo_cpu}`;
        placaVideo.innerHTML = `Placa de vídeo: ${dadosRequeridos[0].modelo_gpu1}`;
        disco.innerHTML = `Disco: ${dadosRequeridos[0].dado_volume} ${dadosRequeridos[0].unidade_volume}`;
        responsavel.innerHTML = `Nome Responsável: ${dadosRequeridos[0].nome_maquina}`;
    
}





















carregarInfosComponente();
async function carregarInfosComponente() {

    var idUsuario = sessionStorage.getItem('idUsuario');
    var idMaquina = sessionStorage.getItem('idMaquina');
    
        fetch(`/dashboardConfiguracaoAlertaRoute/carregarInfosComponente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({
                idServer: idUsuario,
                idMaqui: idMaquina
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
    
                if (resposta.ok) {
    
                    resposta.json().then(json => {
                        console.log(json);
                        console.log(JSON.stringify(json));
    
    
                        const resultadoRequerirDados = json.resultadoRequerirDados;
    
                        console.log(resultadoRequerirDados)
    
                        carregarComponentes(resultadoRequerirDados);
    
                    });
    
                } else {
                    throw "Houve um erro ao tentar acessar os dados da Dashboard do usuário!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    
    
        return false;
    
    }

    let dadoSelecionadoInput = '';
    function carregarComponentes(dadosRequeridos){
        let containerComponentes = document.getElementById("container_esolher_componentes");
        let componenteContainer = document.createElement("div");
        componenteContainer.className = 'container-componentes';
    
        console.log(dadosRequeridos);

        // Percorre os dados recebidos
        for(let i = 0; i < dadosRequeridos.length - 1; i++){
            let componenteGerado = document.createElement("button");
            switch (dadosRequeridos[i].componente) {
                case 'CPU':
                    componenteGerado.innerHTML = "CPU";
                    break;
                case 'HDD':
                    componenteGerado.innerHTML = "HDD";
                    break;
                case 'GPU':
                    componenteGerado.innerHTML = "GPU";
                    break;
                case 'MemoriaRam':
                    componenteGerado.innerHTML = "Memória RAM";
                    break;
                case 'Bateria':
                    componenteGerado.innerHTML = "Bateria";
                    break;
                default:
                    break;
            }

            componenteGerado.onclick = function() {
                let botoes = document.querySelectorAll('.container-componentes button');
                botoes.forEach(b => b.classList.remove('selecionado'));

                componenteGerado.classList.add('selecionado');
    
                dadoSelecionadoInput = dadosRequeridos[i].idComponente;

                carregaridComponente(dadoSelecionadoInput)

                console.log(dadoSelecionadoInput);
            };

            componenteContainer.appendChild(componenteGerado);
        }
        containerComponentes.appendChild(componenteContainer);
    }



    function niveisAlerta(){

        let inputAlerta = document.getElementById("valor_alerta_critico");

        let adequadoTransparente = document.getElementById("adequado_transparente");
        let baixoTransparente = document.getElementById("baixo_transparente");
        let moderadoTransparente = document.getElementById("moderado_transparente");
        let altoTransparente = document.getElementById("alto_transparente");
        let criticoTransparente = document.getElementById("critico_transparente");
        
        adequadoTransparente.innerHTML = `${Math.round(inputAlerta.value / 10 * 100) / 100}`;
        baixoTransparente.innerHTML = `${Math.round(inputAlerta.value * 3 / 10 * 100) / 100}`;
        moderadoTransparente.innerHTML = `${Math.round(inputAlerta.value * 5 / 10 * 100) / 100}`;
        altoTransparente.innerHTML = `${Math.round(inputAlerta.value * 7 / 10 * 100) / 100}`;
        criticoTransparente.innerHTML = `${Math.round(inputAlerta.value * 9 / 10 * 100) / 100}`;


    }













    let idComponente;
    let fkComponente;
    let fkMaquina;

    async function carregaridComponente(nomeComponente) {

        var componente = nomeComponente;
        var idMaquina = sessionStorage.getItem('idMaquina');

            fetch(`/dashboardConfiguracaoAlertaRoute/carregaridComponente`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    idComponente: componente,
                    idMaqui: idMaquina
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);
        
                    if (resposta.ok) {
        
                        resposta.json().then(json => {
                            console.log(json);
                            console.log(JSON.stringify(json));
        
        
                            const resultadoRequerirDados = json.resultadoRequerirDados;
        
                            idComponente = resultadoRequerirDados[0].idComponente;
                            fkComponente = resultadoRequerirDados[0].fkComponente;
                            fkMaquina = resultadoRequerirDados[0].fkMaquina;

                            document.getElementById("valor_alerta_critico").value = resultadoRequerirDados[0].minimoParaSerMedio * 2;
                            niveisAlerta();
                            console.log(resultadoRequerirDados)
        
                        });
        
                    } else {
                        throw "Houve um erro ao tentar acessar os dados da Dashboard do usuário!";
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
        
        
            return false;
        
        }




    async function salvarAlertaCritico() {

        var idMaquina = sessionStorage.getItem('idMaquina');
        let valorInput = document.getElementById("valor_alerta_critico").value;
        
            fetch(`/dashboardConfiguracaoAlertaRoute/salvarAlertaCritico`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    idMaqui: idMaquina,
                    idDoComponente: idComponente,
                    fkDoComponente: fkComponente,
                    fkDaMaquina: fkMaquina,
                    idValor: valorInput
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);
        
                    if (resposta.ok) {
        
                        resposta.json().then(json => {
                            console.log(json);
                            console.log(JSON.stringify(json));
        
        
                            const resultadoRequerirDados = json.resultadoRequerirDados;
        
                            console.log(resultadoRequerirDados)
        
                        });
        
                    } else {
                        throw "Houve um erro ao tentar acessar os dados da Dashboard do usuário!";
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
        
        
            return false;
        
        }




        





















































































































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
          
            if (sessionStorage.getItem("alertaAtivado") === true) {
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
          
              criaAlerta();
          
              const alertPopUp = document.getElementById("popUp_alert");
              const alertDiv = document.getElementById("alert");
          
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
          