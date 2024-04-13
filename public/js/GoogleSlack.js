export function cadastrarGoogle() {
    return entrarGoogle;
}

function credentialResponse(response) {
    jwt_decode(response.credential);
}

function entrarGoogle() {
    return google.accounts.id.initialize({
        client_id: "922098160989-41dl6iquosgboclmnllal5v4krnlrl4g.apps.googleusercontent.com",
        callback: credentialResponse
    });
    // google.accounts.id.prompt();
}

export function chamarSlack() {
    
    window.location = `/slack/auth`;
}
