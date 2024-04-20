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

function validarCampos(listaCampos) {

    let validacaoCampos = true;
    
    for(i = 0; i < listaCampos.length; i++) {
    
        if (
            listaCampos[i].trim() === '' && 
            listaCampos[i].id !== "ipt_complemento" &&
            listaCampos[i].id !== "btPlano"
        ) {

            console.log(listaCampos[i]);
            mostrarMensagem(`Os campos não podem estar vazios.`);
            validacaoCampos = false;
            break;
        
        } else if (
            listaCampos[i].id === "ipt_email" && 
            !(listaCampos[i].includes("@hotmail.com") || 
            listaCampos[i].includes("@gmail.com") || 
            listaCampos[i].includes("@outlook.com") || 
            listaCampos[i].includes("@sptech.school"))
            ) {
                
            mostrarMensagem(`Esse Email é inválido.`)
            validacaoCampos = false;
            break;

        } else if (
            listaCampos[i].id === "ipt_senha" &&
            !new RegExp("^(?=.*\\d)(?=.*[^\\w\\s])(?=.*[A-Z])(?=.*[a-z]).*$").test(listaCampos[i])
            ) {

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

function cadastrar() {
    
    const listaCampos = [];

    const nome = ipt_nome.value;
    const email = ipt_email.value;
    const senha = ipt_senha.value;
    const clienteTipo = verficarRadio(); 
    const estado = ipt_estado.value;
    const cep = ipt_cep.value;
    const numero = ipt_numero.value;
    const complemento = ipt_complemento.value;

    listaCampos.push(nome, email, senha, estado, cep, numero);

    if (!validarCampos(listaCampos)) return false;

    const nomeCargo = criarCargo(clienteTipo);
    console.log(nomeCargo);

    const idCargos = selecionarCargo(nomeCargo);
    console.log(idCargos);
    .

    const body = {  nomeJSON: nome,
        emailJSON: email,
        senhaJSON: senha,
        // fkPlanoJSON: idPlano,
        fkCargosJSON: idCargos,
        clienteTipoJSON: clienteTipo,
        estadoJSON: estado,
        cepJSON: cep,
        numeroJSON: numero,
        complementoJSON: complemento
    }
        cadastrarUsuario(body);
}

function verficarRadio() {
    const radios = document.getElementsByName('tipoCliente');
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios.value;   
    }
    return '';
} 

function voltar(){
    window.location = "index.html";
}

function cadastrarUsuario(body){
    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body
        }),
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

function criarCargo(body){
    fetch("/cargo/criar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body
        }),
    }).then(resposta => {
        console.log("resposta: ", resposta);

    }).catch(resposta => {
        console.log('#ERRO: ', resposta);
    });
    return false;
}

function selecionarCargo(nomeCargo){
    fetch(`/cargo/selecionar/${nomeCargo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
        })

        .catch(function (erro) {
            console.error('Erro desconhecido na API.');
        }
        );
}