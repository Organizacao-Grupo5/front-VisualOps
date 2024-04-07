const Slack = require("@slack/bolt");
require("dotenv").config();

const app = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
});

await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.SLACK_CHANNEL,
    text: "This is a test."
});

async function sendMessage(id, token, message) {
    try {
        const response = await fetch('https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                channel: id,
                text: message,
                username: 'Visual Ops',
                icon_emoji: ':robot_face:'
            })
        });
        
        const responseData = await response.json();
        console.log(responseData);

        if (responseData.ok) {
            console.log('Mensagem enviada com sucesso!');
        } else {
            console.error('Erro ao enviar mensagem: ', responseData.error);
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem: ', error);
    }
}

module.exports = app, sendMessage();