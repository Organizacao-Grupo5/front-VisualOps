let user;
let address;


window.onload = async () => {
    const idUser = sessionStorage.getItem("IdUsuario");
    user = await listar('usuario', 'idUsuario', idUser, '*');
    address = await listar('endereco', 'idUsuario', idUser, 'endereco.*', joinOn([
        { "empresa": ["endereco.fkEmpresa", "empresa.idEmpresa"] },
        { "endereco": ["empresa.idEmpresa", "usuario.fkEmpresa"] }
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




let telefone = document.getElementById("numero");
let cep = document.getElementById("cep");

telefone.addEventListener("input", () => {
    let limparValor = telefone.value.replace(/\D/g, "").substring(0, 11);

    let numerosArray = limparValor.split("")

    let numeroFormatado = "";


    if (numerosArray.length < 11) {
        if (numerosArray.length > 0) {
            numeroFormatado += `(${numerosArray.slice(0, 2).join("")}`;
        }
        if (numerosArray.length > 2) {
            numeroFormatado += `) ${numerosArray.slice(2, 6).join("")}`;
        }
        if (numerosArray.length > 6) {
            numeroFormatado += `-${numerosArray.slice(6, 10).join("")}`;
            console.log(numerosArray)
        }
    } else {
        if (numerosArray.length > 0) {
            numeroFormatado += `(${numerosArray.slice(0, 2).join("")}`;
        }
        if (numerosArray.length > 2) {
            numeroFormatado += `) ${numerosArray.slice(2, 7).join("")}`;
        }
        if (numerosArray.length > 7) {
            numeroFormatado += `-${numerosArray.slice(7, 11).join("")}`;
        }
    }


    telefone.value = numeroFormatado;
})

cep.addEventListener("input", () => {

    let limparValor = cep.value.replace(/\D/g, "").substring(0, 8);
    let cepArray = limparValor.split("");
    let cepFormatado = "";

    if (cepArray.length > 0) {
        cepFormatado += `${cepArray.slice(0, 5).join("")}`;
    }
    if (cepArray.length > 5) {
        cepFormatado += `-${cepArray.slice(5, 8).join("")}`;
    }

    cep.value = cepFormatado
}
)







function pesquisaCepDashboard(valor) {

    let CEP = cep.value;
    let cepDesformatado = CEP.replace(/[^0-9]/g, '');

    if (cepDesformatado != "") {

        var url = 'https://viacep.com.br/ws/' + cepDesformatado + '/json/';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Aqui você pode usar os dados recebidos (data)
                console.log(data); // Saída: objeto JSON com os dados do CEP

                // Exemplo de como acessar os dados do CEP
                console.log("CEP:", data.cep);
                console.log("Logradouro:", data.logradouro);
                console.log("Bairro:", data.bairro);
                console.log("Cidade:", data.localidade);
                console.log("Estado:", data.uf);

                let bairro = document.getElementById("bairro");
                let estado = document.getElementById("estado");
                let rua = document.getElementById("rua");
        
                console.log(bairro.value);
                bairro.value = data.bairro;
                estado.value = data.uf;
                rua.value = data.logradouro;
            })
            .catch(error => {
                console.error('Ocorreu um erro ao fazer a requisição:', error);
            });



    } else {
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
}




