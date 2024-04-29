const tela = window.innerWidth;

function voltar(){
    window.location = "index.html";
}

window.onload = async () => {
    const slctPlano = document.getElementById('slctPlano');
    
    const listaPlanos = await selecionarPlano();

    for (let plano of Object.values(listaPlanos)) {
        
        if (plano) slctPlano.innerHTML += `<option value="${plano.nome}" data-id="${plano.idPlano}">${plano.nome}</option>`

    }
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

function modificarCnpj(event) {

    let input = event.value;

    input = input.replace(/\D/g, '');
    
    let cnpj = '';
    
    for ( let i = 0; i < input.length; i++ ) {
            
        if ( i < 14 ) {
            
            if ( i === 2 || i === 5 ) {
                
                cnpj += '.';
                
            } else if ( i === 8 ) {
                
                cnpj += '/';
                
            } else if ( i === 12) {
                
                cnpj += '-';
                
            }
            
            cnpj += input[i];

        }
            
    }
    
    event.value = cnpj;
}

function modificarNumero(obj) {

    let input = obj.value;
    
    let newInput = '';
    
    for ( let i = 0; i < input.length; i++ ) {
            
        if ( i < 4 ) {
            
            newInput += input[i];

        }
            
    }
    
    obj.value = newInput;
}

function retornarObjEndereco(obj) {
    if (obj) return obj;
}

function validarCampos(LISTA_CAMPOS) {

    let validacaoCampos = true;    

    for(i = 0; i < LISTA_CAMPOS.length; i++) {
    
        if (LISTA_CAMPOS[i].trim() === '') {
            console.log(LISTA_CAMPOS[i]);
            mostrarMensagem(`Os campos não podem estar vazios.`);
            validacaoCampos = false;
            break;
        } else if (!(LISTA_CAMPOS[2].includes("@hotmail.com") || 
                LISTA_CAMPOS[2].includes("@gmail.com") || 
                LISTA_CAMPOS[2].includes("@outlook.com") || 
                LISTA_CAMPOS[2].includes("@sptech.school"))) {
            mostrarMensagem(`Esse Email é inválido.`)
            validacaoCampos = false;
            break;
        } else if (!new RegExp("^(?=.*\\d)(?=.*[^\\w\\s])(?=.*[A-Z])(?=.*[a-z]).*$").test(LISTA_CAMPOS[3])) {
            mostrarMensagem('A Senha deve conter letras MAIÚSCULAS, minúsculas, números e símbolos');
            validacaoCampos = false;
            break;
        }
    }

    return validacaoCampos;    
}

function verificarCep(obj) {

    let input = obj.value;

    input = input.replace(/\D/, '');

    let newInput = '';

    for ( let i = 0; i < input.length; i++ ) {
        
        if ( i < 8 ) {
            
            if ( i === 5 ) {
                newInput += '-';
            }
            
            newInput += input[i];
        
        }
    
    }

    obj.value = newInput;

}

function verficarRadio() {
    const radios = document.getElementsByName('tipoCliente');
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;   
    }

    return '';
} 

async function cadastrar() {
    
    const LISTA_CAMPOS = [];

    const NOME_USUARIO = ipt_nome.value;
    const NOME_FANTASIA = ipt_nomeFantasia.value;
    const PLANO = slctPlano[slctPlano.selectedIndex].dataset.id;
    const EMAIL = ipt_email.value;
    const SENHA = ipt_senha.value;
    const CLIENTE_TIPO = verficarRadio(); 
    const CNPJ = ipt_identificacao.value;
    const LOUGRADOURO = ipt_logradouro.value;
    const CEP = ipt_cep.value;
    const NUMERO = ipt_numero.value;
    const COMPLEMENTO = ipt_complemento.value;
    

    LISTA_CAMPOS.push(NOME_USUARIO, NOME_FANTASIA, EMAIL, SENHA, CLIENTE_TIPO, CNPJ, LOUGRADOURO, CEP, NUMERO);

    if (!validarCampos(LISTA_CAMPOS)) return false;
    
    localStorage.setItem('CARGO', CLIENTE_TIPO);
    sessionStorage.setItem('NOME_USUARIO', NOME_USUARIO);
    sessionStorage.setItem('EMAIL', EMAIL);
    sessionStorage.setItem('SENHA', SENHA);
    sessionStorage.setItem('LOUGRADOURO', LOUGRADOURO);
    sessionStorage.setItem('CEP', CEP); 
    sessionStorage.setItem('NUMERO', NUMERO);
    sessionStorage.setItem('COMPLEMENTO', COMPLEMENTO);
    
    await cadastrarEmpresa(NOME_FANTASIA, CNPJ, PLANO);
    await cadastrarEndereco();
    await cadastrarUsuario(CLIENTE_TIPO);
}

