const olhoSenha = document.getElementById("olho");

olhoSenha.addEventListener("click", mudarVisibilidade);

function mudarVisibilidade() {
    const campoSenha = document.getElementById("ipt_senha");
    if (campoSenha.type === "password") {
        olhoSenha.innerHTML = "visibility";
        campoSenha.type = "text";
    }
    else {
        olhoSenha.innerHTML = "visibility_off"
        campoSenha.type = "password";
    }
}

let mensagem = idMensagem;
const divMsg = document.querySelector(".div-mensagem");

function validarCampos() {
    const inputs = document.querySelectorAll('input');
    let validacaoCampos = true;
    divMsg.style.display = "none"
    
    inputs.forEach(input => {

        if (!validacaoCampos) return;
        var nomeInput = input.id;
        nomeInput = nomeInput.replace("ipt_", '')

        if (input.value.trim() === '' &&
            input.id !== "ipt_complemento") {
            divMsg.style.display = 'block';
            mensagem.innerHTML = `O campo ${nomeInput} está vazio.`
            validacaoCampos = false;
            return;
        } else if (input.id === "ipt_email" &&
                !(input.value.includes("@hotmail.com") || 
                input.value.includes("@gmail.com") || 
                input.value.includes("@outlook.com") || 
                input.value.includes("@sptech.school"))) {
            divMsg.style.display = 'block';
            mensagem.innerHTML = `Esse Email é inválido.`
            validacaoCampos = false;
            return;
        } else if (input.id === "ipt_senha" && 
                !new RegExp("^(?=.*\\d)(?=.*[^\\w\\s])(?=.*[A-Z])(?=.*[a-z]).*$").test(input.value)) {
            divMsg.style.display = 'block';
            mensagem.innerHTML = 'A Senha deve conter letras MAIÚSCULAS, minúsculas, números e símbolos'
            validacaoCampos = false;
            return;
        }
        return;

    });

    return validacaoCampos;

}

function visualizarSenha() {

}



function cadastrar() {
    if (!validarCampos()) return false;

    const nome = ipt_nome.value;
    const email = ipt_email.value;
    const senha = ipt_senha.value;
    const identificacao = ipt_identificacao.value;
    const estado = ipt_estado.value;
    const cep = ipt_cep;
    const numero = ipt_numero;
    const complemento = ipt_complemento;
  
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
