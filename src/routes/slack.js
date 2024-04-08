const express = require("express");
const router = express.Router();
require("dotenv").config();
const appMessage = require("../utils/sendMessage.js");

router.get('/auth', (req, res) => {
    res.redirect(`https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&user_scope=${process.env.SLACK_SCOPE}&redirect_uri=${encodeURIComponent(process.env.SLACK_REDIRECT_URI)}`);
});



router.get('/callback', async (req, res) => {
    try {
        const tokenResponse = await fetch('https://slack.com/api/oauth.v2.access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}&code=${req.query.code}&redirect_uri=${encodeURIComponent(process.env.SLACK_REDIRECT_URI)}`
        });

        const tokenData = await tokenResponse.json();
        console.log("---------------------------");
        console.log(tokenData);
        
        if (tokenData.ok) {
            const tokenAccess = tokenData.authed_user.access_token;
            const id = tokenData.authed_user.id;

            const userResponse = await fetch(`https://slack.com/api/users.profile.get`, {
                method: "GET",
                headers: { Authorization: `Bearer ${tokenAccess}`},
            });

            const userData = await userResponse.json();
            console.log("---------------------------");
            console.log(userData);

            const name = userData.profile.real_name;
            const email = userData.profile.email;

            console.log(name);
            console.log(id);
            console.log(email);  

            console.log("CONSOLE APPMENSAGEM ", appMessage.listarChats(tokenAccess));

        } else {
            console.error("Erro ao obter token de acesso: ", tokenData.error);
            res.status(500).send("Erro ao obter token de acesso");
        }
        res.redirect("../cadastro.html");
    } catch (error) {
        console.error('Erro ao lidar com a autorização do Slack: ', error);
    }
})

module.exports = router;