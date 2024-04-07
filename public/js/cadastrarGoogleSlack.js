function credentialResponse(response) {
    const credential = jwt_decode(response.credential);

    console.log("Email: " + credential.email);
    console.log("Nome: " + credential.name);
    console.log("Id: " + credential.sub);
}

function entrarGoogle() {
    google.accounts.id.initialize({
        client_id: "922098160989-41dl6iquosgboclmnllal5v4krnlrl4g.apps.googleusercontent.com",
        callback: credentialResponse
    });
    google.accounts.id.prompt();
}

const client_idSlack = "6901568173329.6891375184916";
const scope = "chat:write,files:write,users:read.email,users:read"
const redirectUri = "https://acdb-131-72-61-69.ngrok-free.app/cadastro.html"

window.onload = function () {
    document.getElementById("btGoogle").addEventListener("click", entrarGoogle);
    const btSlack = document.getElementById("btSlack");
    btSlack.addEventListener("click", ()=> {
        window.location = `/slack/auth`;
    })
}

