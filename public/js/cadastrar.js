window.onload;

const btPlano = document.getElementById("btPlano");

btPlano.addEventListener("click", mostrarOpcoes); 

const tela = window.innerWidth;

const divPlanos = document.getElementsByClassName("div-planos")[0];

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


const olhoSenha = document.getElementById("olho");

olhoSenha.addEventListener("click", mudarVisibilidade);

function mudarVisibilidade() {
    const campoSenha = document.getElementById("ipt_senha");
    if (campoSenha.type === "password") {
        olhoSenha.innerHTML = "visibility_off";
        campoSenha.type = "text";
    }
    else {
        olhoSenha.innerHTML = "visibility";
        campoSenha.type = "password";
    }
}

let mensagem = idMensagem;
const divMsg = document.querySelector(".div-mensagem");

// const estado = ipt_estado.value;
//     const cep = ipt_cep;
//     const numero = ipt_numero;
//     const complemento = ipt_complemento;
// else if (btPlano.value === "Escolha um plano") {
//     divMsg.style.display = 'block';
//     mensagem.innerHTML = 'Não é possivel cadastrar sem escolher um plano.'
//     validacaoCampos = false;
// }

function validarCampos() {
    const nome = ipt_nome.value;
    const email = ipt_email.value;
    const senha = ipt_senha.value;
    const identificacao = ipt_identificacao.value;
    
    let validacaoCampos = true;
    divMsg.style.display = "none"
    
    if (nome.trim() === '' ||
    email.trim() === '' ||
    senha.trim() === '' ||
    identificacao.trim() === '') {
        divMsg.style.display = 'block';
        mensagem.innerHTML = `Os campos não podem estar vazio.`
        validacaoCampos = false;
    } else if (!(email.includes("@hotmail.com") || 
            email.includes("@gmail.com") || 
            email.includes("@outlook.com") || 
            email.includes("@sptech.school"))) {
        divMsg.style.display = 'block';
        mensagem.innerHTML = `Esse Email é inválido.`
        validacaoCampos = false;
    } else if (!new RegExp("^(?=.*\\d)(?=.*[^\\w\\s])(?=.*[A-Z])(?=.*[a-z]).*$").test(senha)) {
        divMsg.style.display = 'block';
        mensagem.innerHTML = 'A Senha deve conter letras MAIÚSCULAS, minúsculas, números e símbolos'
        validacaoCampos = false;
    } 
    return validacaoCampos;
}

function visualizarSenha() {

}

let statusPage = "pessoal";

function cadastrar() {
    // if (!validarCampos()) return false;

    const nome = ipt_nome.value;
    const email = ipt_email.value;
    const senha = ipt_senha.value;
    const identificacao = ipt_identificacao.value;
    const estado = ipt_estado.value;
    const cep = ipt_cep;
    const numero = ipt_numero;
    const complemento = ipt_complemento;

    if (tela > 720) {
        const dadosPessoais = document.getElementsByClassName("esconder");
        for (let i = 0; i < dadosPessoais.length; i++) {
            dadosPessoais[i].style.display = "none";
        }
        const dadosEndereco = document.getElementsByClassName("esconder-endereco");
        for (let i = 0; i < dadosEndereco.length; i++) {
            dadosEndereco[i].style.display = "grid";            
        }
        btPlano.style.display = "block";
        divPlanos.style.display = "flex";

        statusPage = "endereço";
    }

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

