let user;
let address;


window.onload = async () => {
    const idUser = sessionStorage.getItem("IdUsuario");
    user = await listar('usuario', 'idUsuario', idUser, '*');
    address = await listar('endereco', 'idUsuario', idUser, 'endereco.*', joinOn([
        {"empresa": ["endereco.fkEmpresa", "empresa.idEmpresa"]}, 
        {"endereco": ["empresa.idEmpresa", "usuario.fkEmpresa"]}
    ]));

    trocar();
}

function joinOn(tabelas) {
    return `JOIN ${tabela} ON ${valor2} = ${valor1} `
}


function trocar() {

    console.log(user);
    console.log(address);
    
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let telefone = document.getElementById("numero").value;
    
    let bairro = document.getElementById("bairro").value;
    let estado = document.getElementById("estado").value;
    let cep = document.getElementById("cep").value;
    let rua = document.getElementById("rua").value; 
    let complemento = document.getElementById("complemento").value; 
    
    
    nome == '' ?? `${user.nome}`;
    email == '' ?? `${user.email}`;
    senha == '' ?? `${user.senha}`;
    
    bairro == '' ?? `${address.bairro}`;
    estado == '' ?? `${address.estado}`;
    cep == '' ?? `${address.cep}`;
    rua == '' ?? `${address.rua}`;
    complemento == '' ?? `${address.complemento}`;

}    
