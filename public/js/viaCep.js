function limpa_formulário_cep() {
    document.getElementById('ipt_logradouro').value=("");
}

function extenderUf(uf) {
    switch(uf) {
        case "AC":
            return "Acre"; 
        case "AL": 
            return "Alagoas"; 
        case "AP": 
            return "Amapá"; 
        case "AM": 
            return "Amazonas";
        case "BA": 
            return "Bahía";
        case "CE": 
            return "Ceará";
        case "ES": 
            return "Espírito Santo";
        case "GO":
            return "Goiás";
        case "MA": 
            return "Maranhão";
        case "MT": 
            return "Mato Grosso";
        case "MS": 
            return "Mato Grosso do Sul";
        case "MG":
            return "Minas Gerais";
        case "PA":
            return "Pará";
        case "PB":
            return "Paraíba";
        case "PR": 
            return "Paraná";
        case "PE": 
            return "Pernambuco";
        case "PI":
            return "Piauí";
        case "RJ":
            return "Rio de Janeiro";
        case "RN":
            return "Rio Grande do Norte";
        case "RS":
            return "Rio Grande do Sul";
        case "RO": 
            return "Rondônia";
        case "RR":
            return "Roraima";
        case "SC":
            return "Santa Catarina";
        case "SP":
            return "São Paulo";
        case "SE":
            return "Sergipe";
        case "TO":
            return "Tocantins";
        case "DF":
            return "Distrito Federal";
    }
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('ipt_logradouro').value = conteudo.logradouro;
        
        sessionStorage.setItem('ESTADO', extenderUf(conteudo.uf));
        sessionStorage.setItem('BAIRRO', conteudo.bairro);
    }

}

function pesquisacep(valor) {

    const CEP = valor.replace(/\D/g, '');
    
    if (CEP != "") {
        
        var validacep = /^[0-9]{8}$/;
        
        if(validacep.test(CEP)) {
            
            document.getElementById('ipt_logradouro').value="...";


            var script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/'+ CEP + '/json/?callback=meu_callback';

            document.body.appendChild(script);
            console.log(script)

            

        } else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulário_cep();
    }
}
