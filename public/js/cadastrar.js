const btPlano = 0;

const tela = window.innerWidth;



const divPlanos = 0;

let statusPage = "pessoal";

function mostrarOpcoes() {
    const plano1 = document.getElementById("plano1");
    const plano2 = document.getElementById("plano2");
    const plano3 = document.getElementById("plano3");

    const listaPlanos = [plano1, plano2, plano3];

    if (tela > 600) {

        if (plano2.style.visibility === "visible") {

            plano2.style.top = "0"
            plano2.style.opacity = 0;
            plano2.style.visibility = "hidden";
            
            plano1.style.top = "0";
            plano1.style.right = "-80px";
            plano1.style.opacity = 0;
            plano1.style.visibility = "hidden";
            
            plano3.style.top = "0";
            plano3.style.left = "-80px"
            plano3.style.opacity = 0;
            plano3.style.visibility = "hidden";

            btPlano.style.visibility = "visible";
            setTimeout(() => {
                plano1.style.display = "none";
                plano2.style.display = "none";
                plano3.style.display = "none";

                btPlano.style.display = "block";
                btPlano.style.opacity = 1;
            }, 100);
        } else {
            
            plano1.style.right = "-80px";            
            plano3.style.left = "-80px";
            
            btPlano.style.display = "none";
            btPlano.style.opacity = 0;
            btPlano.style.visibility = "hidden";
            
            plano1.style.display = "block";
            plano2.style.display = "block";
            plano3.style.display = "block";
            setTimeout(()=> {
                
                plano2.style.visibility = "visible";
                plano2.style.opacity = 1;
                plano2.style.top = "-22px"
                
                plano1.style.visibility = "visible";
                plano1.style.opacity = 1;
                plano1.style.right = "10px";
                plano1.style.top = "10px";
                
                plano3.style.visibility = "visible";
                plano3.style.opacity = 1;
                plano3.style.left = "10px";
                plano3.style.top = "10px";
            }, 100);
            
        }
    } else {
        plano1.style.top = "324px";
        plano1.style.visibility = "hidden";
        plano1.style.opacity = 0;
        
        plano3.style.top = "324px";
        plano3.style.visibility = "hidden";
        plano3.style.opacity = 0;
        
        
        if (plano2.style.visibility === "visible") {
            btPlano.style.visibility = "visible";
            plano3.style.left = "calc(40vw - 10px)";
            plano3.style.opacity = 0;
            plano3.style.visibility = "hidden";
            setTimeout(()=> {
                plano1.style.left = "calc(40vw + 20px)";
                plano1.style.opacity = 0;
                plano1.style.visibility = "hidden";
            }, 100);
            setTimeout(()=> {
                plano2.style.top = "324px"
                plano2.style.opacity = 0;
                plano2.style.visibility = "hidden";
            }, 150);
        } else {
            btPlano.style.visibility = "hidden";
            plano2.style.opacity = 1;
            plano2.style.visibility = "visible";
            plano2.style.top = "324px"
            setTimeout(()=> {
                plano1.style.opacity = 1;
                plano1.style.visibility = "visible";
                plano1.style.left = "calc(40vw - 105px)";
            }, 100);
            setTimeout(()=> {
                plano3.style.opacity = 1;
                plano3.style.visibility = "visible";
                plano3.style.left = "calc(40vw + 125px)";
            }, 170);
            
        }
    }
    listaPlanos.forEach(plano => {
        plano.addEventListener("click", () => {
            if (btPlano.style.visibility == "hidden") {
                mostrarOpcoes();
                btPlano.innerHTML = plano.innerHTML;
            }
        })
    });
}

function mudarVisibilidade() {
    const campoSenha = document.getElementById("ipt_senha");
    const olho = document.getElementById("olho");
    if (campoSenha.type === "password") {
        olho.innerHTML = "visibility_off";
        campoSenha.type = "text";
    }
    else {
        olho.innerHTML = "visibility";
        campoSenha.type = "password";
    }
}

function mostrarMensagem(newMensagem) {
    const divMsg = document.querySelector(".div-mensagem");
    divMsg.style.display = 'block';

    let mensagem = idMensagem;

    mensagem.innerHTML = newMensagem;
    
    setTimeout(() => {
        divMsg.style.display = 'none';
    }, 3000)
}

function validarCampos(listaCampos) {

    let validacaoCampos = true;
    
    for(i = 0; i < listaCampos.length; i++) {
    
        if (listaCampos[i].trim() === '' &&
            listaCampos[i].id !== "ipt_complemento" && 
            listaCampos[i].id !== "btPlano") {
            console.log(listaCampos[i]);
            mostrarMensagem(`Os campos não podem estar vazios.`);
            validacaoCampos = false;
            break;
        } else if (listaCampos[i].id === "ipt_email" && 
                !(listaCampos[i].includes("@hotmail.com") || 
                listaCampos[i].includes("@gmail.com") || 
                listaCampos[i].includes("@outlook.com") || 
                listaCampos[i].includes("@sptech.school"))) {
            mostrarMensagem(`Esse Email é inválido.`)
            validacaoCampos = false;
            break;
        } else if (listaCampos[i].id === "ipt_senha" &&
                !new RegExp("^(?=.*\\d)(?=.*[^\\w\\s])(?=.*[A-Z])(?=.*[a-z]).*$").test(listaCampos[i])) {
            mostrarMensagem('A Senha deve conter letras MAIÚSCULAS, minúsculas, números e símbolos');
            validacaoCampos = false;
            break;
        } else if (listaCampos[i].innerHTML === "Escolha um plano") {
            mostrarMensagem('Não é possivel cadastrar-se sem escolher um plano.');
            validacaoCampos = false;
            break;
        }
    }
    return validacaoCampos;    
}

function cadastrar() {
    
    const listaCampos = [];

    const nome = ipt_nome.value;
    const email = ipt_email.value;
    const senha = ipt_senha.value;
    // const identificacao = ipt_identificacao.value;
    const clienteTipo = verficarRadio(); 
    const estado = ipt_estado.value;
    const cep = ipt_cep.value;
    const numero = ipt_numero.value;
    const complemento = ipt_complemento.value;

    listaCampos.push(nome, email, senha, clienteTipo, estado, cep, numero, complemento);

    if (!validarCampos(listaCampos)) return false;

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeJSON: nome,
            emailJSON: email,
            senhaJSON: senha,
            identificacaoJSON: identificacao,
            estadoJSON: estado,
            cepJSON: cep,
            numeroJSON: numero,
            complementoJSON: complemento
        }),
    }).then(resposta => {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            divMsg.style.display = "block";
            mensagem.innerHTML = "Cadastro realizado com sucesso!"

            setTimeout(() => {
                window.location = "index.html";
            }, "1500");
        } else {
            divMsg.style.display = "block";
            mensagem.innerHTML = "Não foi possivel realizar o seu cadastro, por favor tente novamente!"
            setTimeout(() => {
                divMsg.style.display = "none";;
            }, "1500");
            throw "Houve um erro ao tentar realizar o cadastro!"
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });
    return false;
}

function verficarRadio() {
    const radios = document.getElementsByName('tipoCliente');
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radio.value;   
    }
    return '';
} 

