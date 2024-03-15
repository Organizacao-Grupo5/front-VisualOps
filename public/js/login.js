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

function validarCampo() {

    const divMsg = document.querySelector(".div-mensagem");
    divMsg.style.display = "none"
    let mensagem = idMensagem;


    let email = ipt_email.value;
    let senha = ipt_senha.value;


    if (email.trim() === "" || senha.trim() === "") {
        divMsg.style.display = 'block';
        mensagem.innerHTML = `Email e Senha não podem estar vazios.`
        return false;
    } else if (email.includes(" ") || senha.includes(" ")) {
        divMsg.style.display = 'block';
        mensagem.innerHTML = `Email e Senha não devem ter espaços em branco.`
        return false;
    } else if (!(email.includes("@gmail.com") || email.includes("@hotmail.com") ||
            email.includes("@outlook.com") || email.includes("@sptech.school"))) {
        divMsg.style.display = 'block';
        mensagem.innerHTML = `Email inválido.`
        return false;
    } else if (!new RegExp("^(?=.*\\d)(?=.*[^\\w\\s])(?=.*[A-Z])(?=.*[a-z]).*$").test(senha)) {
        divMsg.style.display = 'block';
        mensagem.innerHTML = `Senha deve conter letras MAIÚSCULAS, minúsculas, números e símbolos.`
        return false;
    }

}

function entrar() {
    
    if (!validarCampo()) return false;
    
    fetch("usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailJSON: email
        })
    }).then(resposta => {
        console.log("tentando logar.");

        if (resposta.ok) {
            console.log("Tudo certo com a requisição: "+ resposta)

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.emailUsuario = json.email;
                sessionStorage.nomeUsuario = json.nome;
                sessionStorage.IdUsuario = json.id;

                setTimeout(() => {
                    window.location = ""
                }, 1000);
            });
        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(erro => {
        console.log(erro);
    })
    
    return false;
}
