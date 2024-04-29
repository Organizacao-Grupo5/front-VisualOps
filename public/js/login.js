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

    return true;
}

function entrar() {

    var email = ipt_email.value;
    var senha = ipt_senha.value;
    
    if (!validarCampo()) return false;
    
    autenticar(email, senha);
}

function voltar(){
    window.location = "index.html";
}
