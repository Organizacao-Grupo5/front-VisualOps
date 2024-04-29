function auth(platform) {

    console.log(platform);

    switch (platform) {
        case 'google': authGoogle();
        break;
        case 'slack': authSlack;
        break;
    }
}

function authGoogle() {
    
    google.accounts.id.initialize({
        client_id: "922098160989-41dl6iquosgboclmnllal5v4krnlrl4g.apps.googleusercontent.com",
        callback: credentialResponse
    });
    google.accounts.id.prompt();

}

async function credentialResponse(response) {
         
    try {   
        const resposta = await fetch('/google/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
        });

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