const btnSave = document.querySelector(".btn.save");

const modal = document.getElementById("deleteModal");
const closeBtn = document.querySelector(".close-1");
const closeModalConfirmaAcao = document.querySelector(".close-2");
const passwordFormExcluir = document.getElementById("passwordForm_excluir");
const passwordFormConfirm = document.getElementById("passwordForm_confirmar");

const modalConfirmarAcao = document.getElementById("confirmModal");
const camposFaltantes = document.getElementById("missing_fields");

let nome_funcionario = document.getElementById("nome_funcionario");
let email_funcionario = document.getElementById("email_funcionario");
let senha_funcionario = document.getElementById("senha_funcionario");
let cargo_funcionario = document.getElementById("cargo_funcionario");


let maquina_funcionario = document.getElementById("maquina_funcionario");
let gestor_funcionario = document.getElementById("gestor_funcionario");




async function carregarInfosFuncionario() {

  var idUsuario = sessionStorage.getItem('idUsuarioEdicao');

  fetch(`/dashboardCadastroUserRoute/carregarInfosFuncionario`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      }, body: JSON.stringify({
          idServer: idUsuario
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

                  document.getElementById("gestor_funcionario").value =  ""
                  document.getElementById("maquina_funcionario").value = resultadoRequerirDados[0].numeroIdentificacao;
                  document.getElementById("cargo_funcionario").value = resultadoRequerirDados[0].cargo;
                  document.getElementById("senha_funcionario").value = resultadoRequerirDados[0].senha;
                  document.getElementById("email_funcionario").value =  resultadoRequerirDados[0].email;
                  document.getElementById("nome_funcionario").value = resultadoRequerirDados[0].nome

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



carregarTodosFuncionarios();
async function carregarTodosFuncionarios() {

    var idUsuario = sessionStorage.getItem('idUsuario');
  
    fetch(`/dashboardCadastroUserRoute/carregarTodosFuncionarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            idServer: idUsuario
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
  
            if (resposta.ok) {
  
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
  
  
                    const resultadoRequerirDados = json.resultadoRequerirDados;
  
                    console.log(resultadoRequerirDados);
  
                   let containerFuncionarios = document.getElementById("show_funcionarios");

                    console.log(resultadoRequerirDados.length);

                   for(let i = 0; i < resultadoRequerirDados.length; i++){

                    let cardFuncionario = document.createElement('div');
                    cardFuncionario.className = 'maquina-card';

                    cardFuncionario.innerHTML = `<i class="fa-solid fa-user" aria-hidden="true"></i>
                                    <div class="info-pc">
                                        <h6>Nome: ${resultadoRequerirDados[i].nome}<br>Email: ${resultadoRequerirDados[i].email}<br>Cargo:
                                            ${resultadoRequerirDados[i].cargo}<br>N° Patrimônio: ${resultadoRequerirDados[i].numeroIdentificacao}</h6>
                                    </div>
                                    <button class="garbage" onclick="openModal(${resultadoRequerirDados[i].idUsuario})">
                                        <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
                                    </button>
                                    <button class="pencil" onclick="editarMaquina(${resultadoRequerirDados[i].idUsuario})">
                                        <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                                    </button>`

                    containerFuncionarios.appendChild(cardFuncionario);
                   }


  
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


  function openModalConfirmarAcao() {
    modalConfirmarAcao.style.display = "block";
  }
  
  let maquinaDeletar = "";
  function openModal(usuario) {
    modal.style.display = "block";
    sessionStorage.setItem('userDelete',usuario)
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


  function escolhaCadastroEdicao(){
    if(document.getElementById("situacao_formulario") == "EDIÇÃO"){
        salvarInfosFuncionario()
    }else{
        criarFuncionario()
    }
  }

 function editarMaquina(idUsuarioEdicao){
    sessionStorage.setItem('idUsuarioEdicao', idUsuarioEdicao);
    document.getElementById("situacao_formulario").innerHTML = "EDIÇÃO";
    document.getElementById("btn_save").innerHTML = "Salvar";
    document.getElementById("btn_vlt").style.display = 'flex';

    

    carregarInfosFuncionario();
 }

    function voltarCadastro(){
        limparDados();
        document.getElementById("btn_vlt").style.display = 'none';
        document.getElementById("btn_save").innerHTML = "Criar";
        document.getElementById("situacao_formulario").innerHTML = "CADASTRO";
    }

 function limparDados(){
    document.getElementById("gestor_funcionario").value =  "";
                  document.getElementById("maquina_funcionario").value = "";
                  document.getElementById("cargo_funcionario").value = "";
                  document.getElementById("senha_funcionario").value = "";
                  document.getElementById("email_funcionario").value = "";
                  document.getElementById("nome_funcionario").value = "";
 }











async function salvarInfosFuncionario() {


    gestorFuncionario = document.getElementById("gestor_funcionario").value;
    maquinaFuncionario = document.getElementById("maquina_funcionario").value; 
    cargoFuncionario = document.getElementById("cargo_funcionario").value;
    senhaFuncionario = document.getElementById("senha_funcionario").value; 
    emailFuncionario = document.getElementById("email_funcionario").value;
    nomeFuncionario = document.getElementById("nome_funcionario").value;

    console.log(nomeFuncionario);

    var idUsuario = sessionStorage.getItem('idUsuarioEdicao');
  
    fetch(`/dashboardCadastroUserRoute/salvarInfosFuncionario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            idServer: idUsuario,
            gestorFuncionarioServer : gestorFuncionario,
            maquinaFuncionarioServer : maquinaFuncionario,
            cargoFuncionarioServer : cargoFuncionario,
            senhaFuncionarioServer : senhaFuncionario,
            emailFuncionarioServer : emailFuncionario,
            nomeFuncionarioServer : nomeFuncionario 
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










  async function criarFuncionario() {

    gestorFuncionario = document.getElementById("gestor_funcionario").value;
    maquinaFuncionario = document.getElementById("maquina_funcionario").value; 
    cargoFuncionario = document.getElementById("cargo_funcionario").value;
    senhaFuncionario = document.getElementById("senha_funcionario").value; 
    emailFuncionario = document.getElementById("email_funcionario").value;
    nomeFuncionario = document.getElementById("nome_funcionario").value;

    empresa = sessionStorage.getItem("fkEmpresa");

    console.log(nomeFuncionario);
  
    fetch(`/dashboardCadastroUserRoute/criarFuncionario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            gestorFuncionarioServer : gestorFuncionario,
            maquinaFuncionarioServer : maquinaFuncionario,
            cargoFuncionarioServer : cargoFuncionario,
            senhaFuncionarioServer : senhaFuncionario,
            emailFuncionarioServer : emailFuncionario,
            nomeFuncionarioServer : nomeFuncionario,
            empresaServer : empresa
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


  







    async function excluirFuncionario(){

    userDelete = sessionStorage.getItem("userDelete");
  
    fetch(`/dashboardCadastroUserRoute/excluirFuncionario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({

            userDeleteServer : userDelete
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
