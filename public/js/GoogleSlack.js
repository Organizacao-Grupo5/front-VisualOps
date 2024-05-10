
document.getElementById ("btn_oauth") .addEventListener ("click", (event)=> {
    let platform = event.currentTarget.name;
    setIdConfiguration (platform);    
});

function setIdConfiguration (platform) {
    let idConfiguration = {};
    
    switch (platform) {

        case 'google': {

            deleteAllCookies();

        

            idConfiguration = {
                client_id: "922098160989-41dl6iquosgboclmnllal5v4krnlrl4g.apps.googleusercontent.com",
                callback: credentialResponse
            };
            authGoogle(idConfiguration);

            break;
        }
        case 'slack': {
            return authSlack();
        }        
    };
};

function deleteAllCookies () {
    const cookies = document.cookie.split(";");
    console.log(document.cookie);

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

        document.cookie = name + "=;";
    }

}


function authGoogle(idConfiguration) {
    
    google.accounts.id.initialize(idConfiguration);
    google.accounts.id.prompt();

}

async function credentialResponse(response) {

    console.log(response);
         
    try {   
        const resposta = await fetch('/google/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
        });

        console.log('Entrou aqui');

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log("RESPOSTA JSON: ", dados);

            register(dados)

            return resposta;
        } else {
            console.error("Erro ao autenticar na Google.");

            throw new Error("Erro ao autenticar o usuário na Google!")
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);

        throw error;
    }
}


async function register(dados) {
    const hasLogin = await autenticar(dados.Email, dados.Id);

    if (!hasLogin) {
        await cadastrarEmpresa('', '', 1);
        sessionStorage.setItem('NOME_USUARIO', dados.Nome);
        sessionStorage.setItem('EMAIL', dados.Email);
        sessionStorage.setItem('SENHA', dados.Id);
        await cadastrarUsuario('freelancer');
    }
}