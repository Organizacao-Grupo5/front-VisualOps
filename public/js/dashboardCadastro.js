function verificarCampos(LISTA_CAMPOS) {

    let validacaoCampos = true;    

    for(i = 0; i < LISTA_CAMPOS.length; i++) {
    
        if (LISTA_CAMPOS[i].trim() === '') {
            console.log(LISTA_CAMPOS[i]);
            mostrarMensagem(`Os campos não podem estar vazios.`);
            validacaoCampos = false;
            break;
        } else if (!(LISTA_CAMPOS[1].includes("@hotmail.com") || 
                LISTA_CAMPOS[1].includes("@gmail.com") || 
                LISTA_CAMPOS[1].includes("@outlook.com") || 
                LISTA_CAMPOS[1].includes("@sptech.school"))) {
            mostrarMensagem(`Esse Email é inválido.`)
            validacaoCampos = false;
            break;
        } else if (!new RegExp("^(?=.*\\d)(?=.*[^\\w\\s])(?=.*[A-Z])(?=.*[a-z]).*$").test(LISTA_CAMPOS[2])) {
            mostrarMensagem('A Senha deve conter letras MAIÚSCULAS, minúsculas, números e símbolos');
            validacaoCampos = false;
            break;
        }
    }

    return validacaoCampos;    

}

function adicionar() {

    const LISTA_CAMPOS = [];

    const NOME = nome.value;
    const EMAIL = email.value;
    const SENHA = senha.value;
    const CARGO = cargo.value;

    const MARCA = marca

    
    
    LISTA_CAMPOS.push(NOME, EMAIL, SENHA, CARGO);
    
    if (verificarCampos(!LISTA_CAMPOS)) return false;

}