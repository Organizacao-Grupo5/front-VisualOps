function abrir() {
    var pop = document.getElementById("pop-up");
    pop.style.display = "flex";
}

function fechar() {
    var pop = document.getElementById("pop-up");
    pop.style.display = "none";
}

function baixar() {
    const link = document.createElement('a');
    link.href = '../acesso/logofundo.png';
    link.download = 'Manual VisualOps - Como usar o Client';
    link.click();
}

function baixarJar() {
    const link = document.createElement('a');
    link.href = '../jar/appclient.zip';
    link.download = 'Aplicação Cliente - VisualOps';
    link.click();
}

document.getElementById('downloadManual').addEventListener('click', baixar);
document.getElementById('downloadJar').addEventListener('click', baixarJar)