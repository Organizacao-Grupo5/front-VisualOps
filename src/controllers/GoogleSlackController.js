const usuario = require( '../models/usuarioModel' )

async function callback(req, res) {
    
    try {
        const tokenResponse = await fetch('https://slack.com/api/oauth.v2.access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}&code=${req.query.code}&redirect_uri=${encodeURIComponent(process.env.SLACK_REDIRECT_URI)}`
        });

        const tokenData = await tokenResponse.json();
        
        if (tokenData.ok) {

            const tokenAccess = tokenData.authed_user.access_token;
            
            const userResponse = await fetch(`https://slack.com/api/users.profile.get`, {
                method: "GET",
                headers: { Authorization: `Bearer ${tokenAccess}`},
            });

            const userData = await userResponse.json();

            const name = userData.profile.real_name;
            const id = tokenData.authed_user.id;
            const email = userData.profile.email;

            const objetoSlack = {
                Nome: name,
                Email: email,
                Id: id
            };

            verificarUsuarioSlack(objetoSlack);

            console.log( 'Tudo funcionou corretamente!!\nInformações: ' + objetoSlack );

        } else {
            console.error("Erro ao obter token de acesso: ", tokenData.error);
            res.status(500).send("Erro ao obter token de acesso");
        }
        res.redirect("../cadastro.html");

    } catch (error) {
        console.error('Erro ao lidar com a autorização do Slack: ', error);
    }
    
}

function credentialResponse(response) {
 
    try {
        
        const credential = jwt_decode(response.credential);

        const objetoGoogle = {
            Nome: credential.name,
            Email: credential.email,
            Id: credential.sub
        };

        verificarUsuario(objetoGoogle);

        console.log( 'Tudo funcionou corretamente!!\nInformações: ' + objetoGoogle );

    } catch (error) {

        console.error('Erro ao decodificar o token JWT: ', error);
        throw new Error('Erro ao decodificar o token JWT');
    
    }

}

function entrar(req, res) {

    try {
        
        google.accounts.id.initialize({
            client_id: "922098160989-41dl6iquosgboclmnllal5v4krnlrl4g.apps.googleusercontent.com",
            callback: credentialResponse
        });
        google.accounts.id.prompt();

        res.status(200).send('Autenticação iniciada.');
    
    } catch (error) {
        
        console.error('Erro ao inciar a autenticação: ', error);
        res.status(500).send('Erro ao iniciar a autenticação.');

    }

}

function verificarUsuarioSlack(obj) {
    
    let listaUsuario = [];

    try {
        
        listaUsuario.push(usuario.listar());

    } catch (error) {
        
        console.error('Erro aconteceu ao listar os usuários: '+ error);

    }

    for (let i = 0; i < listaUsuario.length; i++) {
        
        if (
            obj.Id === listaUsuario[i].senha &&
            obj.Email === listaUsuario[i].email
        ) {

            window.location = '../../dashboard.html'
            return;

        }         
        
    }

    try {
        
        usuario.cadastrarAdicional(obj);
        window.location = '../../adicionais.html'

    } catch (error) {
        
        console.error('Erro aconteceu ao cadastrar o usuário autenticado: '+ error);

    }

}

module.exports = { callback, entrar };
