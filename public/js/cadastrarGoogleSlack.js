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

window.onload = function () {
    document.getElementById("btGoogle").addEventListener("click", entrarGoogle);
}
