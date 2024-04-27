window.onload = async () => {
    const slct_plano = document.getElementById('slct_plano');

    const planos = await selecioarPlano();

    console.log(planos);
}

function cadastrarUsuario(CARGO) {

    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: localStorage.getItem(NOME_USUARIO),
            email: localStorage.getItem(EMAIL),
            senha: localStorage.getItem(SENHA),
            cargo: CARGO
        }),
    }).then(resposta => {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            const mensagem = "Cadastro realizado com sucesso!" 
            mostrarMensagem(mensagem);

            setTimeout(() => {
                window.location = "login.html";
            }, 1500);
        } else {
            const mensagem = "Não foi possivel realizar o seu cadastro, por favor tente novamente!" 
            mostrarMensagem(mensagem);
            
            throw "Houve um erro ao tentar realizar o cadastro!"
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });

    return false;
};

function cadastrarEmpresa(NOME_FANTASIA, CNPJ) {

    fetch("/empresa/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: NOME_FANTASIA,
            cnpj: CNPJ,
        }),
    }).then(resposta => {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            const mensagem = "Cadastro realizado com sucesso!";
            mostrarMensagem(mensagem);

        } else {
            const mensagem = "Não foi possivel cadastrar a empresa, por favor tente novamente!";
            mostrarMensagem(mensagem);

            throw "Houve um erro ao tentar realizar o cadastro!"
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });

    return false;
};

function cadastrarEndereco(LOUGRADOURO) {

    fetch("/endereco/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: cep.getItem(NOME_USUARIO),
            cnpj: sessionStorage.getItem(CNPJ)
        }),
    }).then(resposta => {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            const mensagem = "Cadastro realizado com sucesso!";
            mostrarMensagem(mensagem);

        } else {
            const mensagem = "Não foi possivel cadastrar a empresa, por favor tente novamente!";
            mostrarMensagem(mensagem);

            throw "Houve um erro ao tentar realizar o cadastro!"
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });

    return false;
};


const tela = window.innerWidth;

function voltar(){
    window.location = "index.html";
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
            
        if ( i < 6 ) {
            
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
        } else if (LISTA_CAMPOS[1] && 
                !(LISTA_CAMPOS[1].includes("@hotmail.com") || 
                LISTA_CAMPOS[1].includes("@gmail.com") || 
                LISTA_CAMPOS[1].includes("@outlook.com") || 
                LISTA_CAMPOS[1].includes("@sptech.school"))) {
            mostrarMensagem(`Esse Email é inválido.`)
            validacaoCampos = false;
            break;
        } else if (LISTA_CAMPOS[2] &&
                !new RegExp("^(?=.*\\d)(?=.*[^\\w\\s])(?=.*[A-Z])(?=.*[a-z]).*$").test(LISTA_CAMPOS[2])) {
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

function cadastrar() {
    
    const LISTA_CAMPOS = [];

    const NOME_USUARIO = ipt_nome.value;
    const NOME_FANTASIA = ipt_nomeFantasia.value;
    const PLANO = ipt_plano.value;
    const EMAIL = ipt_email.value;
    const SENHA = ipt_senha.value;
    const CLIENTE_TIPO = verficarRadio(); 
    const CNPJ = ipt_identificacao.value;
    const LOUGRADOURO = ipt_logradouro.value;
    const CEP = ipt_cep.value;
    const NUMERO = ipt_numero.value;
    const COMPLEMENTO = ipt_complemento.value;
    

    LISTA_CAMPOS.push(NOME_USUARIO, NOME_FANTASIA, PLANO, EMAIL, SENHA, ESTADO, CEP, COMPLEMENTO);

    if (!validarCampos(LISTA_CAMPOS)) return false;
    
    localStorage.setItem(NOME_USUARIO, EMAIL, SENHA, LOUGRADOURO, CEP, NUMERO, COMPLEMENTO);
    
    criarPlano(Plan);
    cadastrarEmpresa(NOME_FANTASIA, CNPJ);
    cadastrarEndereco();
    cadastrarUsuario(CLIENTE_TIPO);
}

