let botaoMinimizar = document.getElementById("minimizar");
let minMax = 1;

function cliqueiMinimizarSidebar(){
    localStorage.setItem('sidebarMinimizada', 'true');
}

function cliqueiMaximizarSidebar(){
    localStorage.setItem('sidebarMinimizada', 'false');
}

document.addEventListener("DOMContentLoaded", function() {
    // Verifica se o estado da barra lateral está armazenado
    const sidebarMinimizada = localStorage.getItem('sidebarMinimizada');

    if (sidebarMinimizada === "true") {
        botaoMinimizar.click();
    }
});

