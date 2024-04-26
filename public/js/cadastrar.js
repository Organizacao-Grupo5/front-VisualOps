const tela = window.innerWidth;

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

function validarUf(obj) {

    let input = obj.value;

    let newInput = ''; 

    for (let i = 0; i < input.length; i++) {
        
        if ( i < 4 ) {

            newInput += input[i];
            
        }
        
    }

    obj.value = newInput;

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

async function cadastrar() {
    
    const LISTA_CAMPOS = [];

    const NOME_USUARIO = ipt_nome.value;
    const EMAIL = ipt_email.value;
    const SENHA = ipt_senha.value;
    const CLIENTE_TIPO = verficarRadio(); 
    const ESTADO = ipt_estado.value;
    const CEP = ipt_cep.value;
    const NUMERO = ipt_numero.value;
    const COMPLEMENTO = ipt_complemento.value;

    LISTA_CAMPOS.push(NOME_USUARIO, EMAIL, SENHA, ESTADO, CEP, COMPLEMENTO);

    if (!validarCampos(LISTA_CAMPOS)) return false;

    
    await criarCargo(CLIENTE_TIPO);
    
    const fkCargos = await selecionarCargo(CLIENTE_TIPO);
    
    sessionStorage.setItem(NOME_USUARIO, EMAIL, SENHA, CEP, NUMERO);
    
    cadastrarUsuario();
}

function verficarRadio() {
    const radios = document.getElementsByName('tipoCliente');
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;   
    }
    return '';
} 



function voltar(){
    window.location = "index.html";
}

function cadastrarUsuario(corpo){
    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(corpo),
    }).then(resposta => {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            mostrarMensagem("Cadastro realizado com sucesso!");

            setTimeout(() => {
                window.location = "login.html";
            }, "1500");
        } else {
            mostrarMensagem("Não foi possivel realizar o seu cadastro, por favor tente novamente!");
            throw "Houve um erro ao tentar realizar o cadastro!"
        }
    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });
    return false;
}

async function criarCargo(nomeCargo) {

    try {
        const response = await fetch("/cargo/criar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeJSON: nomeCargo
            }),
        })

        if (response.ok) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);
            
            return true;

        } else if (response.status == 409) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);
            
            return false;

        } else {
            console.error("Falha ao criar o cargo.");

            throw new Error("Houve um erro ao tentar criar o cargo!");
        
        }

    } catch (error) {
        console.log("#ERRO: ", error);

        throw error;

    }
};

async function selecionarCargo(nomeCargo) {

    try {
        const response = await fetch(`/cargo/selecionar/${nomeCargo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);

            return dados.idCargos;
        } else {
            console.error("Erro ao selecionar cargo.");

            throw new Error("Hoveu um erro ao tentar selecionar o cargo!")
        }

    } catch (error) {
        console.log("Erro desconhecido na API.", error);

        throw error;
    }
};

module.exports =