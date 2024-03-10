
function validarCampos() {
    const inputs = document.querySelectorAll('input');
    let validacaoCampos = true;
    let mensagem = idMensagem;
    const divMsg = document.querySelector(".div-mensagem");
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
                new RegExp("/^(?=.*\d)(?=.*[^\w\s])(?=.*[A-Z])(?=.*[a-z]).*$/").test(input.value)) {
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
    console.log("chegou aqui")
}